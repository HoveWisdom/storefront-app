using System.Threading;
using System.Threading.Tasks;
using Storefront.Api.Domain.Entities;
using Storefront.Api.Domain.Interfaces;

namespace Storefront.Api.Infrastructure.Data
{
    /// <summary>
    /// Simple in-memory cart repository.
    /// Stores a single cart instance for demo purposes.
    /// Thread safety is ensured via lock for this small demo.
    /// </summary>
    public sealed class InMemoryCartRepository : ICartRepository
    {
        private Cart _cart = new Cart();
        private readonly object _sync = new object();

        public Task<Cart> GetCartAsync(CancellationToken cancellationToken = default)
        {
            // return a shallow copy to avoid callers mutating repository state directly
            lock (_sync)
            {
                var copy = new Cart
                {
                    // keep same id so clients can rely on an id across calls
                    Items = new System.Collections.Generic.List<CartItem>(_cart.Items)
                };
                return Task.FromResult(copy);
            }
        }

        public Task<Cart> SaveCartAsync(Cart cart, CancellationToken cancellationToken = default)
        {
            lock (_sync)
            {
                _cart = cart;
                // return a shallow copy to the caller
                var copy = new Cart
                {
                    Items = new System.Collections.Generic.List<CartItem>(_cart.Items)
                };
                return Task.FromResult(copy);
            }
        }
    }
}