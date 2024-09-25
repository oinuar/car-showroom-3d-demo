using System.Formats.Asn1;
using System.Text.Json;
using Microsoft.AspNetCore.Builder;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using WeMakeCars.Dal;

namespace WeMakeCars.Api.IntegrationTests;

public class TestScope : IDisposable
{
    private readonly TimeSpan DefaultTimeout = TimeSpan.FromSeconds(30);

    private readonly IHostApplicationLifetime _lifetime;

    private readonly DataContext _context;

    private readonly CancellationTokenSource _cts;

    private readonly SqliteConnection _dbConnection;

    private readonly WebApplication _app;

    private readonly JsonSerializerOptions _jsonOptions = new()
    {
        PropertyNameCaseInsensitive = true
    };

    public CancellationToken CancellationToken => _cts.Token;

    public DataContext Context => _context;

    public TestScope(TimeSpan? timeout = null)
    {
        var startup = new Startup();

        _cts = new CancellationTokenSource(timeout ?? DefaultTimeout);
        _dbConnection = new SqliteConnection("DataSource=:memory:");

        startup.Services.AddDbContext<DataContext>(options => options.UseSqlite(_dbConnection));

        _app = startup.Configure();
        _lifetime = _app.Services.GetRequiredService<IHostApplicationLifetime>();
        _context = _app.Services.GetRequiredService<DataContext>();
    }

    public async Task RunApplication()
    {
        await _dbConnection.OpenAsync(CancellationToken);
        await _context.Database.EnsureCreatedAsync(CancellationToken);

        _ = Task.Run(async () => await Startup.Run(_app, CancellationToken));
        _lifetime.ApplicationStarted.WaitHandle.WaitOne();
    }

    public async Task<T?> ReadJson<T>(HttpResponseMessage response) 
    {
        var stream = await response.Content.ReadAsStreamAsync(CancellationToken);
        var result = await JsonSerializer.DeserializeAsync<T>(stream, _jsonOptions, CancellationToken);

        return result;
    }

    public void Dispose()
    {
        _cts.Cancel();
        _lifetime.ApplicationStopped.WaitHandle.WaitOne();
        _dbConnection.Dispose();
    }
}
