using System;

namespace Storefront.Api.Domain.Entities
{
    /// <summary>
    /// Domain model representing a single cart line item.
    /// </summary>
    public sealed class CartItem
    {
        public Guid ProductId { get; set; }

        public string Name { get; set; } = string.Empty;

        public decimal UnitPrice { get; set; }

        public int Quantity { get; set; }

        public decimal Total => UnitPrice * Quantity;
    }
}