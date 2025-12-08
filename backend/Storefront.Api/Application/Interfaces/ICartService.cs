using System.Threading;
using System.Threading.Tasks;
using Storefront.Api.Application.DTOs;

namespace Storefront.Api.Application.Interfaces
{
    /// <summary>
    /// Application service for working with the cart.
    /// Validates product existence and prevents invalid operations.
    /// </summary>
    public interface ICartService
    {
        Task<CartDto> GetCartAsync(CancellationToken cancellationToken = default);

        Task<CartDto> AddToCartAsync(AddToCartRequest request, CancellationToken cancellationToken = default);

        Task<CartDto> UpdateCartAsync(UpdateCartRequest request, CancellationToken cancellationToken = default);
    }
}