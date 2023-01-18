import { Router } from "express";
import { validationMiddleware } from "../middlewares/validation";
import { DanfeController } from "../controllers/danfe.controller";
import { DacteController } from "../controllers/dacte.controller";

const router = Router();

const danfeController = new DanfeController(),
  dacteController = new DacteController();

router.use("/danfe", validationMiddleware, danfeController.handle);
router.use("/dacte", validationMiddleware, dacteController.handle);

export { router };
