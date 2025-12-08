using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Storefront.Api.Application.DTOs;
using Storefront.Api.Application.Interfaces;

namespace Storefront.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public sealed class CartController : ControllerBase
    {
        private readonly ICartService _service;

        public CartController(ICartService service)
        {
            _service = service;
        }

        /// <summary>
        /// GET /api/cart
        /// Returns the current in-memory cart state.
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<CartDto>> Get(CancellationToken cancellationToken)
        {
            var cart = await _service.GetCartAsync(cancellationToken).ConfigureAwait(false);
            return Ok(cart);
        }

        /// <summary>
        /// POST /api/cart
        /// Add an item to the cart.
        /// </summary>
        [HttpPost]
        public async Task<ActionResult<CartDto>> Post([FromBody] AddToCartRequest request, CancellationToken cancellationToken)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var updated = await _service.AddToCartAsync(request, cancellationToken).ConfigureAwait(false);
            return Ok(updated);
        }

        /// <summary>
        /// PATCH /api/cart
        /// Update a cart item's quantity (set to 0 to remove).
        /// </summary>
        [HttpPatch]
        public async Task<ActionResult<CartDto>> Patch([FromBody] UpdateCartRequest request, CancellationToken cancellationToken)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var updated = await _service.UpdateCartAsync(request, cancellationToken).ConfigureAwait(false);
            return Ok(updated);
        }
    }
}