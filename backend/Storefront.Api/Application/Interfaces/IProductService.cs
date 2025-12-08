using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Storefront.Api.Application.DTOs;

namespace Storefront.Api.Application.Interfaces
{
    /// <summary>
    /// Application service interface for product-related business logic.
    /// Service layer sits between controllers and repository.
    /// </summary>
    public interface IProductService
    {
        Task<IReadOnlyList<ProductDto>> GetAllAsync(CancellationToken cancellationToken = default);

        Task<ProductDto?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);
    }
}