using Microsoft.AspNetCore.Mvc;
using PortraitFr.API.Data;
using PortraitFr.API.Models;


namespace PortraitFr.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ParticipantsController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IWebHostEnvironment _env;

    public ParticipantsController(AppDbContext context, IWebHostEnvironment env)
    {
        _context = context;
        _env = env;
    }

    [HttpPost]
    public async Task<IActionResult> PostParticipant([FromForm] ParticipantDto dto)
    {
        if (!dto.AutorisationParticipation)
            return BadRequest("Autorisation requise");

        if (_context.Participants.Any(p => p.Email == dto.Email || p.Instagram == dto.Instagram))
            return Conflict("Instagram ou Email déjà utilisé");

        string? photoPath = null;

        if (dto.Photo != null)
{
    // ✅ Vérifie la taille max (25 Mo)
    if (dto.Photo.Length > 25 * 1024 * 1024)
        return BadRequest("La taille de l'image ne doit pas dépasser 25 Mo.");

    // ✅ Vérifie le type MIME autorisé
    var allowedExtensions = new[] { ".jpg",".JPG", ".jpeg",".JPEG", ".png",".PNG" };
    var extension = Path.GetExtension(dto.Photo.FileName).ToLower();

    if (!allowedExtensions.Contains(extension))
        return BadRequest("Seuls les formats JPG, JPEG et PNG sont autorisés.");

    // ✅ Crée un nom de fichier basé sur @instagram + timestamp
    var timestamp = DateTime.Now.ToString("yyyyMMdd_HHmmss");
    var safeInstagram = dto.Instagram.Replace("@", "").Replace(" ", "").ToLower();
    var fileName = $"{safeInstagram}_{timestamp}{extension}";

    // ✅ Sauvegarde la photo
    var uploadsDir = Path.Combine(_env.WebRootPath ?? "wwwroot", "photos");
    Directory.CreateDirectory(uploadsDir);
    var fullPath = Path.Combine(uploadsDir, fileName);

    using var stream = new FileStream(fullPath, FileMode.Create);
    await dto.Photo.CopyToAsync(stream);

    photoPath = $"/photos/{fileName}";
}


        var participant = new Participant
        {
            Nom = dto.Nom,
            Email = dto.Email,
            Instagram = dto.Instagram,
            Categorie = dto.Categorie,
            Ville = dto.Ville,
            PhotoUrl = photoPath,
            AutorisationParticipation = dto.AutorisationParticipation
        };

        _context.Participants.Add(participant);
        await _context.SaveChangesAsync();

        return Ok(participant);
    }

    [HttpGet]
    public IActionResult GetAll()
    {
        return Ok(_context.Participants.ToList());
    }
}
