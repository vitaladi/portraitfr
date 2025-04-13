FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src
COPY . .
RUN dotnet restore "PortraitFr.API.csproj"
RUN dotnet tool install --global dotnet-ef --version 9.0.3
ENV PATH="$PATH:/root/.dotnet/tools"
RUN dotnet publish "PortraitFr.API.csproj" -c Release -o /app/publish

# --- Étape finale : runtime ---
FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /app

# Copie les fichiers publiés
COPY --from=build /app/publish .

# ✅ Copie manuellement les fichiers statiques (images, etc.)
COPY --from=build /src/wwwroot /app/wwwroot

COPY --from=build /root/.dotnet/tools /root/.dotnet/tools
ENV PATH="$PATH:/root/.dotnet/tools"

ENTRYPOINT ["dotnet", "PortraitFr.API.dll"]
