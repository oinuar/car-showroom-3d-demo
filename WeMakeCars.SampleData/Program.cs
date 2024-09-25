using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using WeMakeCars.Dal;
using WeMakeCars.SampleData.Services;

var builder = Host.CreateApplicationBuilder(args);

builder.Services.AddDataAccessLayer();
builder.Services.AddHostedService<SeedDataService>();

var app = builder.Build();

app.Run();
