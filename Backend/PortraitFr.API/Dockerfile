# Étape 1 : Build
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build

WORKDIR /src

# Copie le code
COPY . .

# 🔁 Installation de Newtonsoft.Json
RUN dotnet add "PortraitFr.API.csproj" package Newtonsoft.Json

# 🔄 Restore des dépendances
RUN dotnet restore "PortraitFr.API.csproj"

# (Optionnel) Install EF Core tools
RUN dotnet tool install --global dotnet-ef --version 9.0.3
ENV PATH="$PATH:/root/.dotnet/tools"

# 🔨 Compilation
RUN dotnet publish "PortraitFr.API.csproj" -c Release -o /app/publish

# Étape 2 : Runtime
FROM mcr.microsoft.com/dotnet/aspnet:9.0

WORKDIR /app

# 📂 Copie de l'application compilée
COPY --from=build /app/publish .

# 📂 Copie des fichiers statiques (photos, etc.)
COPY --from=build /src/wwwroot /app/wwwroot

# (Optionnel) EF Core tools en runtime (pas toujours nécessaire)
COPY --from=build /root/.dotnet/tools /root/.dotnet/tools
ENV PATH="$PATH:/root/.dotnet/tools"

# ▶️ Lancement de l'API
ENTRYPOINT ["dotnet", "PortraitFr.API.dll"]
