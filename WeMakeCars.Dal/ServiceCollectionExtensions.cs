using WeMakeCars.Dal.Services;
using Microsoft.Extensions.DependencyInjection;
using System.Linq;

namespace WeMakeCars.Dal;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddDataAccessLayer(this IServiceCollection services, string connectionString="name=PostgreSqlDatabase")
    {
        return services
            .AddDataContextIfNotExists(connectionString)
            .AddServices();
    }

    private static IServiceCollection AddDataContextIfNotExists(this IServiceCollection services, string connectionString)
    {
        if (services.FirstOrDefault(x => x.ServiceType == typeof(DataContext)) == null)
            return services.AddNpgsql<DataContext>(connectionString);

        return services;
    }

    private static IServiceCollection AddServices(this IServiceCollection services)
    {
        return services
            .AddTransient<ISocketService, EFSocketService>()
            .AddTransient<IPartService, EFPartService>();
    }
}
