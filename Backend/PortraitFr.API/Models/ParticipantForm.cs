using Microsoft.AspNetCore.Http;

namespace PortraitFr.API.Models
{
    public class ParticipantForm
    {
        public string Nom { get; set; } = "";
        public string Email { get; set; } = "";
        public string Instagram { get; set; } = "";
        public string Ville { get; set; } = "";
        public string Categorie { get; set; } = "";
        public bool AutorisationParticipation { get; set; }
        public IFormFile? Photo { get; set; }
    }
}
