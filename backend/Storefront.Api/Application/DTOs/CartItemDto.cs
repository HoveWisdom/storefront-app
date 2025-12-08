using System;

namespace Storefront.Api.Application.DTOs
{
    public sealed class CartItemDto
    {
        public Guid ProductId { get; init; }

        public string Name { get; init; } = string.Empty;

        public decimal UnitPrice { get; init; }

        public int Quantity { get; init; }

        public decimal Total { get; init; }
    }
}