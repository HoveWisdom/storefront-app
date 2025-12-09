using System.Threading;
using System.Threading.Tasks;
using Storefront.Api.Domain.Entities;

namespace Storefront.Api.Domain.Interfaces
{
    /// <summary>
    /// Repository contract for cart persistence. For this challenge, an in-memory implementation is provided.
    /// </summary>
    public interface ICartRepository
    {
        Task<Cart> GetCartAsync(CancellationToken cancellationToken = default);

        Task<Cart> SaveCartAsync(Cart cart, CancellationToken cancellationToken = default);
    }
}