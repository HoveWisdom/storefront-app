using System;
using System.Collections.Generic;

namespace Storefront.Api.Application.DTOs
{
    public sealed class CartDto
    {
        public Guid Id { get; init; }

        public IReadOnlyList<CartItemDto> Items { get; init; } = Array.Empty<CartItemDto>();

        public int TotalItems { get; init; }

        public decimal Subtotal { get; init; }
    }
}