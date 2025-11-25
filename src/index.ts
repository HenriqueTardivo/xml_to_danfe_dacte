import "dotenv/config";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { JsonToCTE } from "./modules/XMLtoPDF/UseCase/json-to-cte-use-case";
import { JsonToDanfe } from "./modules/XMLtoPDF/UseCase/json-to-danfe-use-case";
import { xmlToJson } from "./modules/XMLtoPDF/UseCase/xml-to-json";
import type { IDaCte } from "./modules/interfaces/IDaCte";
import type { INfe } from "./modules/interfaces/INfe";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const {
      body: xml,
      headers: { authorization },
      query: { return_type: returnType },
    } = req;

    if (
      process.env.XML_TO_DANFE_SECRET &&
      (!authorization || authorization !== process.env.XML_TO_DANFE_SECRET)
    ) {
      throw new Error("Missing or invalid authorization header");
    }

    // check if body is a text
    if (typeof xml !== "string" || !xml.length) throw new Error("Invalid XML");

    // check if xml contains "http://www.portalfiscal.inf.br/nfe"
    const isDanfe = xml.includes("www.portalfiscal.inf.br/nfe");
    const isDacte = xml.includes("www.portalfiscal.inf.br/cte");

    if (!isDanfe && !isDacte) throw new Error("Invalid XML");

    const json = await xmlToJson(xml);
    const pdfBase64 = isDanfe
      ? await new JsonToDanfe().jsonToPDF(json as INfe)
      : await new JsonToCTE().jsonToPDF(json as IDaCte);

    if (returnType === "download") {
      const pdfBuffer = Buffer.from(pdfBase64, "base64");
      const uuid = crypto.randomUUID();
      const fileName = isDanfe ? `danfe-${uuid}.pdf` : `dacte-${uuid}.pdf`;

      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${fileName}"`
      );
      res.setHeader("Content-Length", pdfBuffer.length);

      return res.send(pdfBuffer);
    }

    return res.json({ pdfBase64 });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
    return;
  }
}
