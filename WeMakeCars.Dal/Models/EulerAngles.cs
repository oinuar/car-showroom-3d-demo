using System.ComponentModel.DataAnnotations.Schema;

namespace WeMakeCars.Dal.Models;

[ComplexType]
public class EulerAngles
{
    public float X { get; set; }

    public float Y { get; set; }

    public float Z { get; set; }
}
