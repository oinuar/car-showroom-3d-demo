using Microsoft.EntityFrameworkCore;
using Moq.EntityFrameworkCore;
using WeMakeCars.Dal.Models;
using WeMakeCars.Dal.Services;

namespace WeMakeCars.Dal.UnitTests.Services;

public class EFSocketServiceTest
{
    [Fact]
    public async Task GetRoot()
    {
        var context = new Mock<DataContext>(new DbContextOptions<DataContext>());

        var sockets = new List<Socket>
        {
            new() {
                Name = "socket B",
                Transforms = [],
                Level = 0,
                Parts = [],
            },
            new() {
                Name = "socket A",
                Transforms = [],
                Level = 0,
                Parts = [],
            },
            new() {
                Name = "socket C",
                Level = 1,
                Transforms = [],
                Parts = [],
            },
        };

        context
            .Setup(x => x.Sockets)
            .ReturnsDbSet(sockets);

        var socketService = new EFSocketService(context.Object);

        var result = await socketService.GetRoot(default);

        Assert.Collection(result, x =>
        {
            Assert.Equal(sockets[1], x);
        }, x =>
        {
            Assert.Equal(sockets[0], x);
        });
    }

    [Theory]
    [InlineData(1, 2)]
    public async Task GetChildren(int socketId, int partId)
    {
        var context = new Mock<DataContext>(new DbContextOptions<DataContext>());

        var part = new Part {
            PartId = 2,
            Name = "",
            ObjModel = "",
            PreviewUrl = "",
            Sockets = [],
        };

        var sockets = new List<Socket>
        {
            new() {
                Name = "socket B.B",
                Level = 1,
                Transforms = [],
                Parts = [part],
            },
            new() {
                Name = "socket B.A",
                Level = 1,
                Transforms = [],
                Parts = [part],
            },
            new() {
                SocketId = 1,
                Name = "socket B",
                Transforms = [],
                Parts = [
                    new() {
                        PartId = 1,
                        Name = "",
                        ObjModel = "",
                        PreviewUrl = "",
                        Sockets = [],
                    },
                    part
                ],
            },
            new() {
                SocketId = 2,
                Name = "socket A",
                Transforms = [],
                Parts = [],
            },
        };

        context
            .Setup(x => x.Sockets)
            .ReturnsDbSet(sockets);

        var socketService = new EFSocketService(context.Object);

        var result = await socketService.GetChildren(socketId, partId, default);

        Assert.Collection(result, x =>
        {
            Assert.Equal(sockets[1], x);
        }, x =>
        {
            Assert.Equal(sockets[0], x);
        });
    }
}
