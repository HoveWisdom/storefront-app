using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Storefront.Api.Application.DTOs;
using Storefront.Api.Application.Interfaces;
using Storefront.Api.Domain.Entities;
using Storefront.Api.Domain.Interfaces;

namespace Storefront.Api.Application.Services
{
    /// <summary>
    /// Cart service implements business rules:
    /// - Validates product exists before adding
    /// - Ensures quantities are sensible
    /// </summary>
    public sealed class CartService : ICartService
    {
        private readonly ICartRepository _cartRepo;
        private readonly IProductRepository _productRepo;

        public CartService(ICartRepository cartRepo, IProductRepository productRepo)
        {
            _cartRepo = cartRepo ?? throw new ArgumentNullException(nameof(cartRepo));
            _productRepo = productRepo ?? throw new ArgumentNullException(nameof(productRepo));
        }

        public async Task<CartDto> GetCartAsync(CancellationToken cancellationToken = default)
        {
            var cart = await _cartRepo.GetCartAsync(cancellationToken).ConfigureAwait(false);
            return MapToDto(cart);
        }

        public async Task<CartDto> AddToCartAsync(AddToCartRequest request, CancellationToken cancellationToken = default)
        {
            if (request.ProductId is null) throw new ArgumentException("ProductId is required", nameof(request.ProductId));
            if (request.Quantity <= 0) throw new ArgumentException("Quantity must be at least 1", nameof(request.Quantity));

            var product = await _productRepo.GetByIdAsync(request.ProductId.Value, cancellationToken).ConfigureAwait(false);
            if (product is null)
                throw new InvalidOperationException($"Product with id {request.ProductId} not found.");

            if (product.Stock < request.Quantity)
                throw new InvalidOperationException("Requested quantity exceeds available stock.");

            var cart = await _cartRepo.GetCartAsync(cancellationToken).ConfigureAwait(false);

            var item = new CartItem
            {
                ProductId = product.Id,
                Name = product.Name,
                UnitPrice = product.Price,
                Quantity = request.Quantity
            };

            cart.AddOrUpdateItem(item);

            var saved = await _cartRepo.SaveCartAsync(cart, cancellationToken).ConfigureAwait(false);
            return MapToDto(saved);
        }

        public async Task<CartDto> UpdateCartAsync(UpdateCartRequest request, CancellationToken cancellationToken = default)
        {
            if (request.ProductId is null) throw new ArgumentException("ProductId is required", nameof(request.ProductId));
            if (request.Quantity < 0) throw new ArgumentException("Quantity must be >= 0", nameof(request.Quantity));

            var product = await _productRepo.GetByIdAsync(request.ProductId.Value, cancellationToken).ConfigureAwait(false);
            if (product is null)
                throw new InvalidOperationException($"Product with id {request.ProductId} not found.");

            var cart = await _cartRepo.GetCartAsync(cancellationToken).ConfigureAwait(false);

            if (request.Quantity > product.Stock)
                throw new InvalidOperationException("Requested quantity exceeds available stock.");

            cart.UpdateQuantity(request.ProductId.Value, request.Quantity);

            var saved = await _cartRepo.SaveCartAsync(cart, cancellationToken).ConfigureAwait(false);
            return MapToDto(saved);
        }

        private static CartDto MapToDto(Cart cart)
        {
            return new CartDto
            {
                Id = cart.Id,
                Items = cart.Items.Select(i => new CartItemDto
                {
                    ProductId = i.ProductId,
                    Name = i.Name,
                    UnitPrice = i.UnitPrice,
                    Quantity = i.Quantity,
                    Total = i.Total
                }).ToArray(),
                TotalItems = cart.TotalItems,
                Subtotal = cart.Subtotal
            };
        }
    }
}