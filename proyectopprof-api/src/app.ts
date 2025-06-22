import { Application } from "@oak/oak";
import { oakCors } from "cors/mod.ts";
import { globalErrorHandler } from "./middleware/global-error-handler.ts";
import { notFoundHandler } from "./middleware/not-found-handler.ts";
import { router } from "./router.ts";

const app = new Application();

// Middleware
app.use(oakCors());

// Router middleware
app.use(globalErrorHandler); // Must be registered first
app.use(router.routes());
app.use(router.allowedMethods()); // Handle invalid HTTP methods
app.use(notFoundHandler); // Must be registered after all routes

export { app };
