namespace WeMakeCars.Dal.Models;

public class Transform
{
    public int Id { get; set; }

    public required Position Position { get; set; }

    public required EulerAngles Rotation { get; set; }
}
