using Microsoft.AspNetCore.Mvc;
using WeMakeCars.Api.Controllers;
using WeMakeCars.Api.Models;
using WeMakeCars.Dal.Models;
using WeMakeCars.Dal.Services;

namespace WeMakeCars.Api.UnitTests.Controllers;

public class SocketControllerTest
{
    [Fact]
    public async Task Get_ReturnsOkResult_WithViewModels()
    {
        var socketService = new Mock<ISocketService>(MockBehavior.Strict);
        var cancellationToken = new CancellationToken();
        var sockets = new List<Socket> {
            new() {
                SocketId = 1,
                Name = "socket 1",
                Transforms = [],
                Parts = [],
            },
            new() {
                SocketId = 2,
                Name = "socket 2",
                Transforms = [],
                Parts = [],
            },
        };

        sockets[0].Transforms = [
            new() {
                Position = new() {
                    X = 1,
                    Y = 2,
                    Z = 3,
                },
                Rotation = new() {
                    X = 4,
                    Y = 5,
                    Z = 6,
                }
            },
            new() {
                Position = new() {
                    X = 11,
                    Y = 12,
                    Z = 13,
                },
                Rotation = new() {
                    X = 14,
                    Y = 15,
                    Z = 16,
                }
            },
        ];

        socketService
            .Setup(x => x.GetRoot(cancellationToken))
            .ReturnsAsync(sockets);

        var controller = new SocketController(socketService.Object);
        var result = await controller.Get(cancellationToken);

        var okResult = Assert.IsType<OkObjectResult>(result.Result);
        var value = Assert.IsType<List<SocketModel>>(okResult.Value);

        Assert.Collection(value, x => {
            Assert.Equal(x.SocketId, sockets[0].SocketId);
            Assert.Equal(x.Name, sockets[0].Name);
            Assert.Collection(x.Transforms, y => {
                Assert.Equal(y.PositionX, sockets[0].Transforms[0].Position.X);
                Assert.Equal(y.PositionY, sockets[0].Transforms[0].Position.Y);
                Assert.Equal(y.PositionZ, sockets[0].Transforms[0].Position.Z);
                Assert.Equal(y.RotationX, sockets[0].Transforms[0].Rotation.X);
                Assert.Equal(y.RotationY, sockets[0].Transforms[0].Rotation.Y);
                Assert.Equal(y.RotationZ, sockets[0].Transforms[0].Rotation.Z);
            }, y => {
                Assert.Equal(y.PositionX, sockets[0].Transforms[1].Position.X);
                Assert.Equal(y.PositionY, sockets[0].Transforms[1].Position.Y);
                Assert.Equal(y.PositionZ, sockets[0].Transforms[1].Position.Z);
                Assert.Equal(y.RotationX, sockets[0].Transforms[1].Rotation.X);
                Assert.Equal(y.RotationY, sockets[0].Transforms[1].Rotation.Y);
                Assert.Equal(y.RotationZ, sockets[0].Transforms[1].Rotation.Z);
            });
        }, x => {
            Assert.Equal(x.SocketId, sockets[1].SocketId);
            Assert.Equal(x.Name, sockets[1].Name);
        });
    }

    [Theory]
    [InlineData(1, 2)]
    [InlineData(2, 1)]
    public async Task GetByPart_ReturnsOkResult_WithViewModels(int socketId, int partId)
    {
        var socketService = new Mock<ISocketService>(MockBehavior.Strict);
        var cancellationToken = new CancellationToken();
        var sockets = new List<Socket> {
            new() {
                SocketId = socketId + 1,
                Name = "socket 1",
                Transforms = [],
                Parts = [],
            },
            new() {
                SocketId = socketId + 2,
                Name = "socket 2",
                Transforms = [],
                Parts = [],
            },
        };

        socketService
            .Setup(x => x.GetChildren(socketId, partId, cancellationToken))
            .ReturnsAsync(sockets);

        var controller = new SocketController(socketService.Object);
        var result = await controller.GetByPart(socketId, partId, cancellationToken);

        var okResult = Assert.IsType<OkObjectResult>(result.Result);
        var value = Assert.IsType<List<SocketModel>>(okResult.Value);

        Assert.Collection(value, x => {
            Assert.Equal(x.SocketId, sockets[0].SocketId);
            Assert.Equal(x.Name, sockets[0].Name);
        }, x => {
            Assert.Equal(x.SocketId, sockets[1].SocketId);
            Assert.Equal(x.Name, sockets[1].Name);
        });
    }
}
