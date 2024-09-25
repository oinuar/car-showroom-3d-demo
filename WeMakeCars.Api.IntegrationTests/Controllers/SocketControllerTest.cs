using System.Net;
using WeMakeCars.Api.Models;
using WeMakeCars.Dal.Models;

namespace WeMakeCars.Api.IntegrationTests.Controllers;

public class SocketControllerTest
{
    [Fact]
    public async Task Get_ReturnsEmptyList()
    {
        using var scope = new TestScope();
        var httpClient = new HttpClient();
        
        await scope.RunApplication();

        var response = await httpClient.GetAsync("http://localhost:5000/api/Socket/Get", scope.CancellationToken);

        Assert.Equal(HttpStatusCode.OK, response.StatusCode);

        var values = await scope.ReadJson<IList<SocketModel>>(response);

        Assert.NotNull(values);
        Assert.Empty(values);
    }
    
    [Fact]
    public async Task Get_ReturnRootSocketList()
    {
        using var scope = new TestScope();
        var httpClient = new HttpClient();

        var sockets = new List<Socket> {
            new() {
                Name = "socket 1",
                Transforms = [],
                Level = 0,
                Parts = [],
            },
            new() {
                Name = "socket 2",
                Transforms = [],
                Level = 0,
                Parts = [],
            },
            new() {
                Name = "socket 3",
                Level = 1,
                Transforms = [],
                Parts = [],
            },
        };

        await scope.RunApplication();

        await scope.Context.AddRangeAsync(sockets);
        await scope.Context.SaveChangesAsync();

        var response = await httpClient.GetAsync("http://localhost:5000/api/Socket/Get", scope.CancellationToken);

        Assert.Equal(HttpStatusCode.OK, response.StatusCode);

        var values = await scope.ReadJson<IList<SocketModel>>(response);

        Assert.NotNull(values);
        Assert.Collection(values, x => {
            Assert.Equal(sockets[0].Name, x.Name);
            Assert.Equal(1, x.SocketId);
        },
        x => {
            Assert.Equal(sockets[1].Name, x.Name);
            Assert.Equal(2, x.SocketId);
        });
    }

    [Theory]
    [InlineData(1, 2)]
    public async Task GetByPart_ReturnsEmptyList(int partId, int socketId)
    {
        using var scope = new TestScope();
        var httpClient = new HttpClient();
        
        await scope.RunApplication();

        var response = await httpClient.GetAsync($"http://localhost:5000/api/Socket/GetByPart?partId={partId}&socketId={socketId}", scope.CancellationToken);

        Assert.Equal(HttpStatusCode.OK, response.StatusCode);

        var values = await scope.ReadJson<IList<SocketModel>>(response);

        Assert.NotNull(values);
        Assert.Empty(values);
    }

    [Theory]
    [InlineData(1, 2)]
    public async Task GetByPart_ReturnsChildrenSocketList(int partId, int socketId)
    {
        using var scope = new TestScope();
        var httpClient = new HttpClient();
        
        var sockets = new List<Socket> {
            new() {
                Name = "socket 1",
                Transforms = [],
                Parts = [],
            },
            new() {
                Name = "socket 2",
                Transforms = [],
                Parts = [
                    new() {
                        Name = "part 1",
                        ObjModel = "",
                        PreviewUrl = "",
                        Sockets = [
                            new() {
                                Name = "socket 2.1",
                                Level = 1,
                                Transforms = [],
                                Parts = [],
                            },
                            new() {
                                Name = "socket 2.2",
                                Level = 1,
                                Transforms = [],
                                Parts = [],
                            },
                        ],
                    },
                    new() {
                        Name = "part 2",
                        ObjModel = "",
                        PreviewUrl = "",
                        Sockets = [],
                    },
                ],
            },
        };

        await scope.RunApplication();

        await scope.Context.AddRangeAsync(sockets);
        await scope.Context.SaveChangesAsync();

        var response = await httpClient.GetAsync($"http://localhost:5000/api/Socket/GetByPart?partId={partId}&socketId={socketId}", scope.CancellationToken);

        Assert.Equal(HttpStatusCode.OK, response.StatusCode);

        var values = await scope.ReadJson<IList<SocketModel>>(response);

        Assert.NotNull(values);
        Assert.Collection(values, x => {
            Assert.Equal(sockets[1].Parts[0].Sockets[0].Name, x.Name);
        },
        x => {
            Assert.Equal(sockets[1].Parts[0].Sockets[1].Name, x.Name);
        });
    }
}
