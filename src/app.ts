import express, { type Express } from "express";
import swaggerUi from "swagger-ui-express";
import { openApiDocument } from "@/docs/openapi";
import { convertRouter } from "@/routes/convert.route";

/**
 * Builds the Express application (without starting the HTTP listener) so it can
 * be reused by the server entrypoint and by integration tests.
 */
export function createApp(): Express {
	const app = express();

	// Fiscal XML arrives as a raw string in the request body, regardless of the
	// content-type the client sends, so parse every body as text.
	app.use(express.text({ type: () => true, limit: "10mb" }));

	// Health check.
	app.get("/health", (_req, res) => res.json({ status: "ok" }));

	// Interactive API docs.
	app.get("/openapi.json", (_req, res) => res.json(openApiDocument));
	app.use("/docs", swaggerUi.serve, swaggerUi.setup(openApiDocument));

	// Conversion endpoint.
	app.use("/", convertRouter);

	return app;
}
