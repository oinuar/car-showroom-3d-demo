using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using WeMakeCars.Api.Models;
using WeMakeCars.Dal.Models;
using WeMakeCars.Dal.Services;
using Microsoft.AspNetCore.Mvc;

namespace WeMakeCars.Api.Controllers;

[Route("api/[controller]/[action]")]
[ApiController]
public class SocketController(ISocketService socketService) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IList<SocketModel>>> Get(CancellationToken cancellationToken)
    {
        var sockets = await socketService.GetRoot(cancellationToken);

        return Ok(sockets);
    }

    [HttpGet]
    public async Task<ActionResult<IList<SocketModel>>> GetByPart([Required]int socketId, [Required]int partId, CancellationToken cancellationToken)
    {
        var sockets = await socketService.GetChildren(socketId, partId, cancellationToken);

        return Ok(sockets);
    }

    private ActionResult<IList<SocketModel>> Ok(IList<Socket> sockets)
    {
        return Ok(sockets.Select(x => new SocketModel {
            SocketId = x.SocketId,
            Name = x.Name,
            Transforms = x.Transforms.Select(y => new TransformModel {
                PositionX = y.Position.X,
                PositionY = y.Position.Y,
                PositionZ = y.Position.Z,
                RotationX = y.Rotation.X,
                RotationY = y.Rotation.Y,
                RotationZ = y.Rotation.Z,
            }).ToList()
        }).ToList());
    }
}
