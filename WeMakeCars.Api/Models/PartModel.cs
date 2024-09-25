
namespace WeMakeCars.Api.Models;

public class PartModel
{
    public int PartId { get; set; }
    
    public int SocketId { get; set; }

    public required string Name { get; set; }

    public required string ObjModel { get; set; }

    public required string PreviewUrl { get; set; }
}
