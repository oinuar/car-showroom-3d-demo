using Microsoft.EntityFrameworkCore;
using WeMakeCars.Dal.Models;

namespace WeMakeCars.Dal;

public class DataContext(DbContextOptions<DataContext> options) : DbContext(options)
{
    public virtual DbSet<Part> Parts { get; set; }

    public virtual DbSet<Socket> Sockets { get; set; }

    public virtual DbSet<Transform> Transforms { get; set; }
}
