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
public class PartController(IPartService partService) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IList<PartModel>>> GetBySocket([Required]int socketId, int limit = 100, int offset = 0, CancellationToken cancellationToken = default)
    {
        var parts = await partService.GetAll(socketId, limit, offset, cancellationToken);

        return Ok(socketId, parts);
    }

    private ActionResult<IList<PartModel>> Ok(int socketId, IList<Part> parts)
    {
        return Ok(parts.Select(x => new PartModel {
            PartId = x.PartId,
            SocketId = socketId,
            Name = x.Name,
            ObjModel = x.ObjModel,
            PreviewUrl = x.PreviewUrl,
        }).ToList());
    }
}
