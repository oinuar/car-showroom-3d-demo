using Microsoft.EntityFrameworkCore;
using Moq.EntityFrameworkCore;
using WeMakeCars.Dal.Models;
using WeMakeCars.Dal.Services;

namespace WeMakeCars.Dal.UnitTests.Services;

public class EFPartServiceTest
{
    [Theory]
    [InlineData(1, 100, 0)]
    public async Task GetAll(int socketId, int limit, int offset)
    {
        var context = new Mock<DataContext>(new DbContextOptions<DataContext>());

        var parts = new List<Part>
        {
            new() {
                Name = "part B",
                ObjModel = "",
                PreviewUrl = "",
                Sockets = [
                    new() {
                        SocketId = socketId,
                        Name = "",
                        Parts = [],
                        Transforms = [],
                    }
                ],
            },
            new() {
                Name = "part A",
                ObjModel = "",
                PreviewUrl = "",
                Sockets = [
                    new() {
                        SocketId = socketId,
                        Name = "",
                        Parts = [],
                        Transforms = [],
                    }
                ],
            },
            new() {
                Name = "part C",
                ObjModel = "",
                PreviewUrl = "",
                Sockets = [
                    new() {
                        SocketId = socketId + 1,
                        Name = "",
                        Parts = [],
                        Transforms = [],
                    }
                ],
            },
        };

        context
            .Setup(x => x.Parts)
            .ReturnsDbSet(parts);

        var partService = new EFPartService(context.Object);

        var result = await partService.GetAll(socketId, limit, offset, default);

        Assert.Collection(result, x => {
            Assert.Equal(parts[1], x);
        }, x => {
            Assert.Equal(parts[0], x);
        });
    }
}
