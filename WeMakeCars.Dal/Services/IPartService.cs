using System.Threading;
using System.Threading.Tasks;
using System.Collections.Generic;
using WeMakeCars.Dal.Models;

namespace WeMakeCars.Dal.Services;

public interface IPartService
{
    public Task<IList<Part>> GetAll(int socketId, int limit, int offset, CancellationToken cancellationToken);
}
