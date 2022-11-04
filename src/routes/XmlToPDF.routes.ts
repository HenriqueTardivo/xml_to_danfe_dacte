import { Router } from "express";
import { XMLtoPDFController } from "../module/XMLtoPDF/xml-to-pdf-controller";

const xmlToPDF = Router();

const xmlToPDFController = new XMLtoPDFController();

xmlToPDF.post("/", xmlToPDFController.handle);

export { xmlToPDF };
