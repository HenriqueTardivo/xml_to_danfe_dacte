import { Router } from "express";
import { convertHandler } from "@/controllers/convert.controller";

const router = Router();

/**
 * @openapi ties this route to the OpenAPI document defined in `@/docs/openapi`.
 */
router.post("/", convertHandler);

export { router as convertRouter };
