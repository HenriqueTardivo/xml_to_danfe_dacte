import { JsonToCTE } from "@/modules/XMLtoPDF/UseCase/json-to-cte-use-case";
import { JsonToCTEOS } from "@/modules/XMLtoPDF/UseCase/json-to-cteos-use-case";
import { JsonToDanfe } from "@/modules/XMLtoPDF/UseCase/json-to-danfe-use-case";
import { xmlToJson } from "@/modules/XMLtoPDF/UseCase/xml-to-json";
import type { ICteOS } from "@/modules/interfaces/ICteOS";
import type { IDaCte } from "@/modules/interfaces/IDaCte";
import type { INfe } from "@/modules/interfaces/INfe";

export type DocumentKind = "danfe" | "dacte" | "dacteos";

export interface ConversionResult {
	kind: DocumentKind;
	pdf: Buffer;
}

const NFE_NAMESPACE = "www.portalfiscal.inf.br/nfe";
const CTE_NAMESPACE = "www.portalfiscal.inf.br/cte";

/**
 * Thrown when the incoming payload is not a supported fiscal document.
 * Carries a 400-style semantic so the HTTP layer can map it to a client error.
 */
export class InvalidXmlError extends Error {
	constructor(message = "Invalid XML") {
		super(message);
		this.name = "InvalidXmlError";
	}
}

/**
 * Detects the fiscal document model directly from the raw XML.
 *
 * - NF-e (DANFE) is identified by its namespace.
 * - CT-e is identified by its namespace; model 67 (CT-e OS) is then
 *   distinguished from the ordinary cargo model 57 through the `<mod>` tag.
 */
export function detectDocumentKind(xml: string): DocumentKind {
	if (xml.includes(NFE_NAMESPACE)) return "danfe";

	if (xml.includes(CTE_NAMESPACE)) {
		return /<mod>\s*67\s*<\/mod>/.test(xml) ? "dacteos" : "dacte";
	}

	throw new InvalidXmlError();
}

/**
 * Converts a raw fiscal document XML (NF-e / CT-e / CT-e OS) into a PDF buffer.
 */
export async function convertXmlToPdf(xml: string): Promise<ConversionResult> {
	const kind = detectDocumentKind(xml);
	const json = await xmlToJson(xml);

	let pdfBase64: string;
	switch (kind) {
		case "danfe":
			pdfBase64 = await new JsonToDanfe().jsonToPDF(json as INfe);
			break;
		case "dacte":
			pdfBase64 = await new JsonToCTE().jsonToPDF(json as IDaCte);
			break;
		case "dacteos":
			pdfBase64 = await new JsonToCTEOS().jsonToPDF(json as ICteOS);
			break;
	}

	return { kind, pdf: Buffer.from(pdfBase64, "base64") };
}
