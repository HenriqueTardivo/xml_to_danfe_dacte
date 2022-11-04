import { Router } from "express";
import { xmlToPDF } from "./XmlToPDF.routes";

const router = Router();
router.use("/XmlToPDF", xmlToPDF);

export { router };
