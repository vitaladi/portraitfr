using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using PortraitFr.API.Data;

namespace PortraitFr.API
{
    public class AppDbContextFactory : IDesignTimeDbContextFactory<AppDbContext>
    {
        public AppDbContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<AppDbContext>();

            // 👉 Changement ici : "Host=portraitfr_db" = nom du service Docker
            optionsBuilder.UseNpgsql("Host=portraitfr_db;Port=5432;Database=portraitfr;Username=postgres;Password=password");

            return new AppDbContext(optionsBuilder.Options);
        }
    }
}
