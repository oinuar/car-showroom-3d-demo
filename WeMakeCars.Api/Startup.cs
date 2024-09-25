using System.Runtime.CompilerServices;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using WeMakeCars.Dal;

[assembly:InternalsVisibleTo("WeMakeCars.Api.IntegrationTests")]

internal class Startup(params string[] args)
{
    private readonly WebApplicationBuilder _builder = WebApplication.CreateBuilder(args);

    public IServiceCollection Services => _builder.Services;

    public WebApplication Configure()
    {
        _builder.Services.AddEndpointsApiExplorer();
        _builder.Services.AddSwaggerGen();
        _builder.Services.AddControllers();
        _builder.Services.AddDataAccessLayer();

        return _builder.Build();
    }

    public static Task Run(WebApplication app, CancellationToken cancellationToken)
    {
        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        /*app.UseCors(options => {
            options.AllowAnyOrigin();
        });*/

        //app.UseHttpsRedirection();
        app.MapControllers();

        return app.RunAsync(cancellationToken);
    }
}
