using System.Threading;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using WeMakeCars.Dal.Models;

namespace WeMakeCars.Dal.Services;

internal class EFSocketService(DataContext context) : ISocketService
{
    public async Task<IList<Socket>> GetRoot(CancellationToken cancellationToken)
    {
        return await context
            .Sockets
            .Where(x => x.Level == 0)
            .OrderBy(x => x.Name)
            .Include(x => x.Transforms)
            .ToListAsync(cancellationToken);
    }

    public async Task<IList<Socket>> GetChildren(int socketId, int partId, CancellationToken cancellationToken)
    {
        var parent = await context
            .Sockets
            .FirstOrDefaultAsync(x => x.SocketId == socketId, cancellationToken);

        if (parent == null)
            return [];

        return await context
            .Sockets
            .Where(x => x.Level > parent.Level && x.Parts.Any(y => y.PartId == partId))
            .OrderBy(x => x.Name)
            .Include(x => x.Transforms)
            .ToListAsync(cancellationToken);
    }
}
