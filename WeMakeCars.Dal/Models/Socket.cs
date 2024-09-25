using System.Collections.Generic;

namespace WeMakeCars.Dal.Models;

public class Socket
{
    public int SocketId { get; set; }

    public required string Name { get; set; }

    public int Level { get; set; }

    public required IList<Part> Parts { get; set; }

    public required IList<Transform> Transforms { get; set; }
}
