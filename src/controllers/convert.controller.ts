import type { Request, Response } from "express";
import { randomUUID } from "node:crypto";
import {
	convertXmlToPdf,
	InvalidXmlError,
} from "@/modules/XMLtoPDF/xml-to-pdf.service";

/**
 * POST / — converts a raw NF-e / CT-e / CT-e OS XML into its DANFE / DACTE PDF.
 *
 * Body: the raw XML (any text content-type).
 * Header `authorization`: required when `XML_TO_DANFE_SECRET` is configured.
 * Query `return_type=download`: streams the PDF as an attachment instead of
 * returning it as base64 JSON.
 */
export async function convertHandler(req: Request, res: Response) {
	const secret = process.env.XML_TO_DANFE_SECRET;
	if (secret && req.headers.authorization !== secret) {
		return res
			.status(401)
			.json({ error: "Missing or invalid authorization header" });
	}

	const xml = req.body;
	if (typeof xml !== "string" || xml.length === 0) {
		return res.status(400).json({ error: "Invalid XML: empty request body" });
	}

	try {
		const { kind, pdf } = await convertXmlToPdf(xml);

		if (req.query.return_type === "download") {
			const fileName = `${kind}-${randomUUID()}.pdf`;
			res.setHeader("Content-Type", "application/pdf");
			res.setHeader(
				"Content-Disposition",
				`attachment; filename="${fileName}"`,
			);
			res.setHeader("Content-Length", pdf.length);
			return res.send(pdf);
		}

		return res.json({ kind, pdfBase64: pdf.toString("base64") });
	} catch (error) {
		if (error instanceof InvalidXmlError) {
			return res.status(400).json({ error: error.message });
		}
		console.error(error);
		return res
			.status(500)
			.json({ error: "Failed to generate document from XML" });
	}
}
