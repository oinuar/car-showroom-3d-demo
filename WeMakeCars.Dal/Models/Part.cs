using System.Collections.Generic;

namespace WeMakeCars.Dal.Models;

public class Part
{
    public int PartId { get; set; }

    public required string Name { get; set; }

    public required string ObjModel { get; set; }

    public required string PreviewUrl { get; set; }

    public required IList<Socket> Sockets { get; set; }
}
