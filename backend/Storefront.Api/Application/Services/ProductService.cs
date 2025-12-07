using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Storefront.Api.Application.DTOs;
using Storefront.Api.Application.Interfaces;
using Storefront.Api.Application.Mappers;
using Storefront.Api.Domain.Interfaces;

namespace Storefront.Api.Application.Services
{
    /// <summary>
    /// Implementation of product service. Keeps business logic centralized and testable.
    /// </summary>
    public sealed class ProductService : IProductService
    {
        private readonly IProductRepository _repo;

        public ProductService(IProductRepository repo)
        {
            _repo = repo ?? throw new ArgumentNullException(nameof(repo));
        }

        public async Task<IReadOnlyList<ProductDto>> GetAllAsync(CancellationToken cancellationToken = default)
        {
            var products = await _repo.GetAllAsync(cancellationToken).ConfigureAwait(false);
            return products.Select(ProductMapper.ToDto).ToArray();
        }

        public async Task<ProductDto?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
        {
            var product = await _repo.GetByIdAsync(id, cancellationToken).ConfigureAwait(false);
            if (product is null) return null;
            return ProductMapper.ToDto(product);
        }
    }
}