using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace PortraitFr.API.Models
{
    public class ParticipantDto
    {
        [Required]
        public required string Nom { get; set; }

        [Required]
        [EmailAddress]
        public required string Email { get; set; }

        [Required]
        public required string Instagram { get; set; }
        
        [Required]
        public required string Categorie { get; set; }

        [Required]
        public required string Ville { get; set; }

        public IFormFile? Photo { get; set; }

        [Required]
        public bool AutorisationParticipation { get; set; }
    }
}
