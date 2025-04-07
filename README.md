# Next-SINNO

Next-SINNO is a router template designed for creating routers with customizable lifecycle logic. It enforces a normalized response format, making it easier for frontend handling.

- **Customizable Lifecycle Logic**: Customize the router behavior to meet specific needs.
- **Normalized Response Format**: Ensures consistent and easy-to-handle responses on the frontend.

## Installation

To install Next-SINNO, run the following command:

```bash
npm install @gustybobby/next-sinno
```

## Creating a Router Config

The Next-SINNO router allows you to configure different lifecycle hooks for actions such as setting up logging, running logic before and after the handler, and handling errors. This enables a highly flexible and structured approach to building routers.

### Example: Setting Up the Router Config

```ts
import { createRouterConfig } from "@gustybobby/next-sinno";

// CustomRequest: Any Request extending the WebAPI `Request` such as `NextRequest`
// Logger: your custom logger interface extending `SinnoLogger`

const routerConfig = 
  createRouterConfig<CustomRequest, Logger>()
    .setupLogger(async ({ req }) => {
      // Initialize your logger
      return new LoggerService().initLogWithReq(req);
    })
    .beforeHandler(async () => {
      // Any logic you want to run before the handler
    })
    .onHandlerComplete(async ({ logger, response }) => {
      // Any logic you want to run after the handler completes

      // Cleanup the logger
      logger.endLog(response);
    })
    .onHandlerError(async ({ logger, error }) => {
      // Handle errors and log the details
      const errorResponse = errorResponseHandler(error, logger);
      logger.endLog(errorResponse);
      return errorResponse;
    });
```

## Creating Sinno Router

Once the router config is set up, you can create a Sinno router using your custom configuration.

```ts
// file path: /api/users/[userId]/route.ts

import { createSinnoRouter } from "@gustybobby/next-sinno";

export const { GET } = createSinnoRouter<
  NextRequest, // Any Request extending the WebAPI `Request` such as `NextRequest`
  { userId: string }, // Route slug parameters from Next.js App Router
  Logger, // Your custom logger interface extending `SinnoLogger`
  { GET: string; }, // The response types for the method
>(
  {
    GET: async ({ req, logger }) => {
      // Example logic: authenticate the user
      await authenticate(req, logger);

      // Must return `payload` as specified in the method result and response `SinnoResponse`
      return {
        payload: "hello!",
        response: {
          code: "SUCCESS",
          msg: "Successful",
          status: 200,
        }
      };
    },
  },
  routerConfig // Your router configuration
);
```

