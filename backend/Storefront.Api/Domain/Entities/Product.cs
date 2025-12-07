using System;

namespace Storefront.Api.Domain.Entities
{
    /// <summary>
    /// Core domain entity representing a product in the storefront.
    /// </summary>
    public sealed class Product
    {
        public Guid Id { get; init; }

        public string Name { get; init; }

        public string Description { get; init; }

        public decimal Price { get; init; }

        public string? ImageUrl { get; init; }

        public int Stock { get; init; }

        public string? Category { get; init; }

        public Product(Guid id, string name, string description, decimal price, int stock, string? imageUrl = null, string? category = null)
        {
            Id = id;
            Name = name ?? throw new ArgumentNullException(nameof(name));
            Description = description ?? string.Empty;
            Price = price;
            Stock = stock;
            ImageUrl = imageUrl;
            Category = category;
        }
    }
}