using System.Collections.Generic;

namespace WeMakeCars.Api.Models;

public class SocketModel
{
    public int SocketId { get; set; }

    public required string Name { get; set; }

    public required IList<TransformModel> Transforms { get; set; }
}
