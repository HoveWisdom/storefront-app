using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Storefront.Api.Domain.Entities;

namespace Storefront.Api.Domain.Interfaces
{
    /// <summary>
    /// Repository contract for product data access.
    /// Abstracts the data store so it can be swapped (EF Core, file, remote) without changing services.
    /// </summary>
    public interface IProductRepository
    {
        Task<IReadOnlyList<Product>> GetAllAsync(CancellationToken cancellationToken = default);

        Task<Product?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);
    }
}