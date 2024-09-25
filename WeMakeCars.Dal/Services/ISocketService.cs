using System.Threading;
using System.Threading.Tasks;
using System.Collections.Generic;
using WeMakeCars.Dal.Models;

namespace WeMakeCars.Dal.Services;

public interface ISocketService
{
    public Task<IList<Socket>> GetRoot(CancellationToken cancellationToken);

    public Task<IList<Socket>> GetChildren(int socketId, int partId, CancellationToken cancellationToken);
}
