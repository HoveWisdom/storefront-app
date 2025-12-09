using System;
using System.ComponentModel.DataAnnotations;

namespace Storefront.Api.Application.DTOs
{
    /// <summary>
    /// Request DTO for adding an item to the cart.
    /// </summary>
    public sealed class AddToCartRequest
    {
        [Required]
        public Guid? ProductId { get; set; }

        [Range(1, int.MaxValue)]
        public int Quantity { get; set; } = 1;
    }
}