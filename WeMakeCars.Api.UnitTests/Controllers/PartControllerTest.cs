using Microsoft.AspNetCore.Mvc;
using WeMakeCars.Api.Controllers;
using WeMakeCars.Api.Models;
using WeMakeCars.Dal.Models;
using WeMakeCars.Dal.Services;

namespace WeMakeCars.Api.UnitTests.Controllers;

public class PartControllerTest
{
    [Theory]
    [InlineData(1, 100, 0)]
    [InlineData(2, 101, 1)]
    public async Task GetBySocket_ReturnsOkResult_WithViewModels(int socketId, int limit, int offset)
    {
        var partService = new Mock<IPartService>(MockBehavior.Strict);
        var cancellationToken = new CancellationToken();
        var parts = new List<Part> {
            new() {
                PartId = socketId + 1,
                Name = "part 1",
                ObjModel = "obj model for part 1",
                PreviewUrl = "preview url for part 1",
                Sockets = [],
            },
            new() {
                PartId = socketId + 2,
                Name = "part 2",
                ObjModel = "obj model for part 2",
                PreviewUrl = "preview url for part 2",
                Sockets = [],
            },
        };

        partService
            .Setup(x => x.GetAll(socketId, limit, offset, cancellationToken))
            .ReturnsAsync(parts);

        var controller = new PartController(partService.Object);
        var result = await controller.GetBySocket(socketId, limit, offset, cancellationToken);

        var okResult = Assert.IsType<OkObjectResult>(result.Result);
        var value = Assert.IsType<List<PartModel>>(okResult.Value);

        Assert.Collection(value, x => {
            Assert.Equal(x.PartId, parts[0].PartId);
            Assert.Equal(x.SocketId, socketId);
            Assert.Equal(x.Name, parts[0].Name);
            Assert.Equal(x.ObjModel, parts[0].ObjModel);
            Assert.Equal(x.PreviewUrl, parts[0].PreviewUrl);
        }, x => {
            Assert.Equal(x.PartId, parts[1].PartId);
            Assert.Equal(x.SocketId, socketId);
            Assert.Equal(x.Name, parts[1].Name);
            Assert.Equal(x.ObjModel, parts[1].ObjModel);
            Assert.Equal(x.PreviewUrl, parts[1].PreviewUrl);
        });
    }
}
