using System;
using System.Collections.Generic;
using System.Linq;

namespace Storefront.Api.Domain.Entities
{
    /// <summary>
    /// Domain aggregate representing a shopping cart.
    /// For a small demo we keep cart per application (single cart) and simple logic.
    /// </summary>
    public sealed class Cart
    {
        public Guid Id { get; init; } = Guid.NewGuid();

        public IList<CartItem> Items { get; init; } = new List<CartItem>();

        public int TotalItems => Items.Sum(i => i.Quantity);

        public decimal Subtotal => Items.Sum(i => i.Total);

        public void AddOrUpdateItem(CartItem item)
        {
            if (item.Quantity <= 0) return;

            var existing = Items.FirstOrDefault(i => i.ProductId == item.ProductId);
            if (existing is null)
            {
                Items.Add(item);
            }
            else
            {
                existing.Quantity += item.Quantity;
            }
        }

        public void UpdateQuantity(Guid productId, int quantity)
        {
            var existing = Items.FirstOrDefault(i => i.ProductId == productId);
            if (existing is null) return;

            if (quantity <= 0)
            {
                Items.Remove(existing);
            }
            else
            {
                existing.Quantity = quantity;
            }
        }
    }
}