import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import { convertXmlToPdf } from "@/modules/XMLtoPDF/xml-to-pdf.service";
import {
	assinaturaDoPdf,
	lerFixture,
	temTarjaDeHomologacao,
} from "./helpers/pdf";

/**
 * Rede de segurança do layout: os PDFs são geometria posicionada à mão, então
 * qualquer refatoração precisa provar que a saída não mudou. As assinaturas
 * abaixo são o sha256 do PDF com data de criação/IDs zerados.
 *
 * Quando uma assinatura falhar, NÃO atualize por reflexo: gere o PDF antes e
 * depois e compare visualmente. Se a mudança for intencional, rode
 * `npm run test:golden` para regravar as assinaturas.
 */
const golden: Record<string, string> = JSON.parse(
	readFileSync(join(__dirname, "golden", "assinaturas.json"), "utf8"),
);

const DOCUMENTOS = ["danfe", "dacte", "cteos"] as const;

describe("golden dos PDFs", () => {
	for (const documento of DOCUMENTOS) {
		it(`${documento} continua byte a byte igual ao golden`, async () => {
			const { pdf } = await convertXmlToPdf(lerFixture(documento));

			assert.equal(
				assinaturaDoPdf(pdf),
				golden[documento],
				`o layout do ${documento} mudou — compare os PDFs antes de regravar o golden`,
			);
		});
	}

	it("gera o mesmo PDF a cada execução", async () => {
		const primeira = await convertXmlToPdf(lerFixture("dacte"));
		const segunda = await convertXmlToPdf(lerFixture("dacte"));

		assert.equal(assinaturaDoPdf(primeira.pdf), assinaturaDoPdf(segunda.pdf));
	});
});

describe("ambiente (tpAmb)", () => {
	it("desenha a tarja de homologação quando tpAmb = 2", async () => {
		const { pdf } = await convertXmlToPdf(lerFixture("dacte"));

		assert.ok(temTarjaDeHomologacao(pdf));
	});

	it("não desenha a tarja quando tpAmb = 1 (produção)", async () => {
		const producao = lerFixture("dacte").replace(
			/<tpAmb>2<\/tpAmb>/g,
			"<tpAmb>1</tpAmb>",
		);

		const { pdf } = await convertXmlToPdf(producao);

		assert.ok(!temTarjaDeHomologacao(pdf));
	});
});
