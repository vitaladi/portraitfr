using Microsoft.EntityFrameworkCore;
using PortraitFr.API.Data;

var builder = WebApplication.CreateBuilder(args);

// ✅ Permet d'exposer l'API sur 0.0.0.0 (utile pour Docker)
builder.WebHost.UseUrls("http://0.0.0.0:80");

// 👉 Connexion à PostgreSQL (via docker-compose)
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// 👉 Ajout des services nécessaires
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// 👉 CORS (autorise tout pendant le dev)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// 👉 Middleware
app.UseCors("AllowAll");
app.UseStaticFiles(); // pour servir les fichiers uploadés (photos)
app.UseAuthorization();
app.MapControllers();

// 👉 Swagger (optionnel pour test API)
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.Run();
