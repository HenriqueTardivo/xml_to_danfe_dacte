import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { convertXmlToPdf } from "@/modules/XMLtoPDF/xml-to-pdf.service";
import { assinaturaDoPdf, lerFixture } from "../helpers/pdf";

/**
 * Regrava as assinaturas do golden (`npm run test:golden`).
 *
 * Só rode depois de conferir visualmente que a mudança no PDF é intencional —
 * o golden é justamente o que impede uma alteração de layout passar batida.
 */
async function main() {
	const assinaturas: Record<string, string> = {};

	for (const documento of ["danfe", "dacte", "cteos"]) {
		const { pdf } = await convertXmlToPdf(lerFixture(documento));
		assinaturas[documento] = assinaturaDoPdf(pdf);
		console.log(`${documento}: ${assinaturas[documento]}`);
	}

	writeFileSync(
		join(__dirname, "assinaturas.json"),
		`${JSON.stringify(assinaturas, null, "\t")}\n`,
	);
}

main();
