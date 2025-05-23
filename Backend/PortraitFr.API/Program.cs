using Microsoft.EntityFrameworkCore;
using PortraitFr.API.Data;
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddHttpClient();

// ✅ Permet d'exposer l'API sur 0.0.0.0 (Docker)
builder.WebHost.UseUrls("http://0.0.0.0:80");

// 👉 Connexion PostgreSQL
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// 👉 Ajout des services
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// ✅ CORS : production sécurisé sur awards.portraitfr.fr
builder.Services.AddCors(options =>
{
    options.AddPolicy("ProductionCors", policy =>
    {
        policy.WithOrigins("https://awards.portraitfr.fr")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });

    options.AddPolicy("DevCors", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// ✅ Utiliser le bon CORS selon l’environnement
if (app.Environment.IsDevelopment())
{
    app.UseCors("DevCors");
    app.UseSwagger();
    app.UseSwaggerUI();
}
else
{
    app.UseCors("ProductionCors");
}

// Ajoutez ceci avant app.Run()
app.MapWhen(ctx => !ctx.Request.Path.StartsWithSegments("/api"), appBuilder => 
{
    appBuilder.UseStaticFiles();
    appBuilder.UseRouting();
    appBuilder.UseEndpoints(endpoints =>
    {
        endpoints.MapControllers();
    });
});
app.Run();
