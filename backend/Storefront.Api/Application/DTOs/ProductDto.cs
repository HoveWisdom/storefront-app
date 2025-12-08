using System;

namespace Storefront.Api.Application.DTOs
{
    /// <summary>
    /// Data Transfer Object for sending product data to clients.
    /// Keeps API contract separate from domain.
    /// </summary>
    public sealed class ProductDto
    {
        public Guid Id { get; init; }

        public string Name { get; init; }

        public string Description { get; init; }

        public decimal Price { get; init; }

        public string? ImageUrl { get; init; }

        public int Stock { get; init; }

        public string? Category { get; init; }
    }
}