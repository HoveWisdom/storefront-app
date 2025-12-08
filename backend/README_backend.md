# Storefront Backend (.NET 8 Web API)

This folder contains the Storefront API implemented in .NET 8. The API is structured with a layered architecture:

- Domain: Entities and interfaces (core business models)
- Application: Services, DTOs, mappers (business logic)
- Infrastructure: Data implementations (in-memory here)
- Presentation: Controllers exposing the API surface

## Endpoints

- `GET /api/products` — list all products
- `GET /api/products/{id}` — get a single product by GUID
- `GET /api/cart` — get current cart state (development convenience)
- `POST /api/cart` — add item to cart
  - Request body: `{ "productId": "GUID", "quantity": 1 }`
- `PATCH /api/cart` — update item quantity in cart
  - Request body: `{ "productId": "GUID", "quantity": 2 }` (use 0 to remove)

## Validation & Error Handling

- Request DTOs use DataAnnotations ([Required], [Range]) to enable automatic model validation.
- A global exception middleware maps unhandled exceptions to JSON Problem-like responses and returns a 500 status code.
- Services validate domain rules (e.g. product existence, stock checks) and throw meaningful exceptions that are surfaced to the client.

## Run locally

1. Navigate to the API project:

```bash
cd backend/Storefront.Api
dotnet restore
dotnet run
```

API base path: `/api`. In development, Swagger UI is available at `/swagger`.

## Notes on Design

- Repository and service layers keep business logic testable and isolated from controllers.
- In-memory stores are used for quick development and can be replaced with persistent storage without changing controllers or application services.
- Cart logic is intentionally simple: a single in-memory cart instance is stored for demo purposes.