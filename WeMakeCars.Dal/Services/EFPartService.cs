using System.Threading;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using WeMakeCars.Dal.Models;

namespace WeMakeCars.Dal.Services;

internal class EFPartService(DataContext context) : IPartService
{
    public async Task<IList<Part>> GetAll(int socketId, int limit, int offset, CancellationToken cancellationToken)
    {
        return await context
            .Parts
            .Where(x => x.Sockets.Any(y => y.SocketId == socketId))
            .OrderBy(x => x.Name)
            .Skip(offset)
            .Take(limit)
            .ToListAsync(cancellationToken);
    }
}
