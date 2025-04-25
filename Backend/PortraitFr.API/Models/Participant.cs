using System.ComponentModel.DataAnnotations;

namespace PortraitFr.API.Models
{
    public class Participant
    {
        public int Id { get; set; }

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

        public string? PhotoUrl { get; set; }

        [Required]
        public bool AutorisationParticipation { get; set; }
    }
}
