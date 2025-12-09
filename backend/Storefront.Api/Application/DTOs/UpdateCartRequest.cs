using System;
using System.ComponentModel.DataAnnotations;

namespace Storefront.Api.Application.DTOs
{
    /// <summary>
    /// For PATCH /api/cart - update quantity for a single product in the cart.
    /// </summary>
    public sealed class UpdateCartRequest
    {
        [Required]
        public Guid? ProductId { get; set; }

        [Range(0, int.MaxValue)]
        public int Quantity { get; set; }
    }
}