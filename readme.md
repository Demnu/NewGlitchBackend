# New and Improved Glitchhub Backend 🦦 (WIP)

Here's a quick run-down:

## Features:

- **Postgres**: Had to go back to the tried and true. Goodbye Mongo 👋
- **CQRS Implementation**: Efficiently handle different data access operations.
- **Swagger Integration**: Seamless API documentation and testing.
- **Automatic Client API Generation**: Javascript clients now have a nice type-safe way to communicate with the server.
- **Drizzle-Orm Integration**:
  - Entities can be added, removed or edited easily.
  - Drizzle studio. Browse, add, delete and update anything in the database on the fly. 🏃‍♂️
  - Integrated migrations for easier DB management.
- **Ordermentum API Connection**: Say goodbye to manually reading orders from emails!
- **Docker Support**: Easily containerize and deploy the application. 🐳
- **TypeScript Integration**: Finally... 💫
- **Zod Integratio**: Robust validation with Zod schemas, ensuring that  data conforms to the type before it hits the server-side logic.
## TODO:
- Integration/Unit Tests
- Authentication/Authorization
- Complete endpoints!
- Robust error handling ❌

## Libraries:
- drizzle-orm
- swagger-autogen
- swagger-typescript-api
- swagger-ui-express
- zod

