# Use the official .NET SDK image for building the project
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /usr/local/app

# Copy the project files and restore any dependencies
COPY ["WeMakeCars.sln", "."]
COPY ["WeMakeCars.Api/WeMakeCars.Api.csproj", "WeMakeCars.Api/"]
COPY ["WeMakeCars.Api.UnitTests/WeMakeCars.Api.UnitTests.csproj", "WeMakeCars.Api.UnitTests/"]
COPY ["WeMakeCars.Api.IntegrationTests/WeMakeCars.Api.IntegrationTests.csproj", "WeMakeCars.Api.IntegrationTests/"]
COPY ["WeMakeCars.Dal/WeMakeCars.Dal.csproj", "WeMakeCars.Dal/"]
COPY ["WeMakeCars.Dal.UnitTests/WeMakeCars.Dal.UnitTests.csproj", "WeMakeCars.Dal.UnitTests/"]
COPY ["WeMakeCars.SampleData/WeMakeCars.SampleData.csproj", "WeMakeCars.SampleData/"]
RUN dotnet restore

# Copy the rest of the files and build the application
COPY . .
RUN dotnet build -c Release -o build

FROM build AS qa
RUN DOTNET_USE_POLLING_FILE_WATCHER=1 dotnet test "WeMakeCars.Dal.UnitTests" &&\
    DOTNET_USE_POLLING_FILE_WATCHER=1 dotnet test "WeMakeCars.Api.UnitTests" &&\
    DOTNET_USE_POLLING_FILE_WATCHER=1 ASPNETCORE_APPLICATIONNAME=WeMakeCars.Api ASPNETCORE_CONTENTROOT=/usr/local/app/WeMakeCars.Api ASPNETCORE_URLS=http://localhost:5000 dotnet test "WeMakeCars.Api.IntegrationTests"

WORKDIR /usr/local/app

RUN dotnet publish "WeMakeCars.Api" -c Release -o publish

# Use the official ASP.NET image to serve the app
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS publish

COPY --from=qa /usr/local/app/publish .

ENTRYPOINT ["dotnet", "WeMakeCars.Api.dll"]
