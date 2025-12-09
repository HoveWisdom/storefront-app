using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Storefront.Api.Application.DTOs;
using Storefront.Api.Application.Interfaces;

namespace Storefront.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public sealed class ProductsController : ControllerBase
    {
        private readonly IProductService _service;

        public ProductsController(IProductService service)
        {
            _service = service ?? throw new ArgumentNullException(nameof(service));
        }

        /// <summary>
        /// GET /api/products
        /// Returns a list of available products.
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<ProductDto>>> GetAll(CancellationToken cancellationToken)
        {
            var products = await _service.GetAllAsync(cancellationToken).ConfigureAwait(false);
            return Ok(products);
        }

        /// <summary>
        /// GET /api/products/{id}
        /// Returns details for a single product.
        /// </summary>
        [HttpGet("{id:guid}")]
        public async Task<ActionResult<ProductDto>> GetById(Guid id, CancellationToken cancellationToken)
        {
            var product = await _service.GetByIdAsync(id, cancellationToken).ConfigureAwait(false);
            if (product is null)
                return NotFound(new { Message = $"Product with id '{id}' not found." });

            return Ok(product);
        }
    }
}