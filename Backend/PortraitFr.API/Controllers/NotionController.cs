using Microsoft.AspNetCore.Mvc;
using System.Net.Http.Headers;
using System.Text;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Http;
using PortraitFr.API.Models;

namespace PortraitFr.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class NotionController : ControllerBase
{
    private readonly IHttpClientFactory _httpClientFactory;
    private readonly IConfiguration _config;

    public NotionController(IHttpClientFactory httpClientFactory, IConfiguration config)
    {
        _httpClientFactory = httpClientFactory;
        _config = config;
    }

    [HttpPost]
    public async Task<IActionResult> SubmitToNotion([FromForm] ParticipantForm form)
    {
        var client = _httpClientFactory.CreateClient();
        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _config["Notion:Token"]);
        client.DefaultRequestHeaders.Add("Notion-Version", "2022-06-28");

        var uploadUrl = "";
        if (form.Photo != null)
        {
            var fileName = Path.GetFileName(form.Photo.FileName);
            var fileBytes = await FileToByteArray(form.Photo);
            var base64 = Convert.ToBase64String(fileBytes);
            uploadUrl = $"data:{form.Photo.ContentType};base64,{base64}";
        }

        var payload = new
        {
            parent = new { database_id = _config["Notion:DatabaseId"] },
            properties = new
            {
                Nom = new
                {
                    title = new[]
                    {
                        new { text = new { content = form.Nom } }
                    }
                },
                Email = new { email = form.Email },
                Instagram = new { rich_text = new[] { new { text = new { content = form.Instagram } } } },
                Ville = new { rich_text = new[] { new { text = new { content = form.Ville } } } },
                Catégorie = new { select = new { name = form.Categorie } },
                Autorisation = new { checkbox = form.AutorisationParticipation }
            },
            children = uploadUrl != "" ? new[]
            {
                new {
                    @object = "block",
                    type = "file",
                    file = new {
                        type = "external",
                        external = new { url = uploadUrl }
                    }
                }
            } : null
        };

        var json = JsonConvert.SerializeObject(payload, new JsonSerializerSettings
        {
            NullValueHandling = NullValueHandling.Ignore
        });

        var content = new StringContent(json, Encoding.UTF8, "application/json");
        var response = await client.PostAsync("https://api.notion.com/v1/pages", content);

        var responseBody = await response.Content.ReadAsStringAsync();
        return response.IsSuccessStatusCode
            ? Ok(JsonConvert.DeserializeObject(responseBody))
            : StatusCode((int)response.StatusCode, responseBody);
    }

    private async Task<byte[]> FileToByteArray(IFormFile file)
    {
        using var memoryStream = new MemoryStream();
        await file.CopyToAsync(memoryStream);
        return memoryStream.ToArray();
    }
}
