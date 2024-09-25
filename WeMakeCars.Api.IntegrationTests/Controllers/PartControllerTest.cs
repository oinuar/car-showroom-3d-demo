using System.Net;
using WeMakeCars.Api.Models;
using WeMakeCars.Dal.Models;

namespace WeMakeCars.Api.IntegrationTests.Controllers;

public class PartControllerTest
{
    [Theory]
    [InlineData(1)]
    public async Task GetBySocket_ReturnsEmptyList(int socketId)
    {
        using var scope = new TestScope();
        var httpClient = new HttpClient();
        
        await scope.RunApplication();

        var response = await httpClient.GetAsync($"http://localhost:5000/api/Part/GetBySocket?socketId={socketId}", scope.CancellationToken);

        Assert.Equal(HttpStatusCode.OK, response.StatusCode);

        var values = await scope.ReadJson<IList<PartModel>>(response);

        Assert.NotNull(values);
        Assert.Empty(values);
    }

    [Theory]
    [InlineData(1)]
    public async Task GetBySocket_ReturnsPartList(int socketId)
    {
        using var scope = new TestScope();
        var httpClient = new HttpClient();

        var sockets = new List<Socket> {
            new() {
                Name = "socket 1",
                Transforms = [],
                Parts = [
                    new() {
                        Name = "part 1",
                        ObjModel = "obj model for part 1",
                        PreviewUrl = "preview url of part 1",
                        Sockets = [],
                    },
                    new() {
                        Name = "part 2",
                        ObjModel = "obj model for part 2",
                        PreviewUrl = "preview url of part 2",
                        Sockets = [],
                    },
                ],
            },
            new() {
                Name = "socket 2",
                Transforms = [],
                Parts = [],
            },
        };

        await scope.RunApplication();

        await scope.Context.AddRangeAsync(sockets);
        await scope.Context.SaveChangesAsync();

        var response = await httpClient.GetAsync($"http://localhost:5000/api/Part/GetBySocket?socketId={socketId}", scope.CancellationToken);

        Assert.Equal(HttpStatusCode.OK, response.StatusCode);

        var values = await scope.ReadJson<IList<PartModel>>(response);

        Assert.NotNull(values);
        Assert.Collection(values, x => {
            Assert.Equal(sockets[0].Parts[0].Name, x.Name);
            Assert.Equal(sockets[0].Parts[0].ObjModel, x.ObjModel);
            Assert.Equal(sockets[0].Parts[0].PreviewUrl, x.PreviewUrl);
            Assert.Equal(socketId, x.SocketId);
        },
        x => {
            Assert.Equal(sockets[0].Parts[1].Name, x.Name);
            Assert.Equal(sockets[0].Parts[1].ObjModel, x.ObjModel);
            Assert.Equal(sockets[0].Parts[1].PreviewUrl, x.PreviewUrl);
            Assert.Equal(socketId, x.SocketId);
        });
    }
}
