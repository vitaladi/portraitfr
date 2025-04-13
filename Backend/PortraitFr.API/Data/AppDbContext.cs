using Microsoft.EntityFrameworkCore;
using PortraitFr.API.Models;

namespace PortraitFr.API.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Participant> Participants { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Participant>()
                .HasIndex(p => p.Instagram)
                .IsUnique();

            modelBuilder.Entity<Participant>()
                .HasIndex(p => p.Email)
                .IsUnique();
        }
    }
}
