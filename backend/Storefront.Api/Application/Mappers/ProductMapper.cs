using Storefront.Api.Application.DTOs;
using Storefront.Api.Domain.Entities;

namespace Storefront.Api.Application.Mappers
{
    /// <summary>
    /// Small mapping helper to transform domain entities into DTOs.
    /// For larger projects use AutoMapper or a mapping layer.
    /// </summary>
    internal static class ProductMapper
    {
        public static ProductDto ToDto(Product p) =>
            new ProductDto
            {
                Id = p.Id,
                Name = p.Name,
                Description = p.Description,
                Price = p.Price,
                ImageUrl = p.ImageUrl,
                Stock = p.Stock,
                Category = p.Category
            };
    }
}