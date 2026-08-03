import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
	convertXmlToPdf,
	detectDocumentKind,
	InvalidXmlError,
} from "@/modules/XMLtoPDF/xml-to-pdf.service";
import { lerFixture } from "./helpers/pdf";

describe("detectDocumentKind", () => {
	it("reconhece NF-e, CT-e e CT-e OS", () => {
		assert.equal(detectDocumentKind(lerFixture("danfe")), "danfe");
		assert.equal(detectDocumentKind(lerFixture("dacte")), "dacte");
		assert.equal(detectDocumentKind(lerFixture("cteos")), "dacteos");
	});

	it("separa o modelo 67 do 57 pela tag <mod>", () => {
		const cte = lerFixture("dacte");
		assert.equal(detectDocumentKind(cte), "dacte");
		assert.equal(
			detectDocumentKind(cte.replace("<mod>57</mod>", "<mod>67</mod>")),
			"dacteos",
		);
	});

	it("rejeita XML que não é documento fiscal suportado", () => {
		assert.throws(() => detectDocumentKind("<xml><a/></xml>"), InvalidXmlError);
	});
});

describe("convertXmlToPdf", () => {
	for (const [fixture, kind] of [
		["danfe", "danfe"],
		["dacte", "dacte"],
		["cteos", "dacteos"],
	] as const) {
		it(`converte ${fixture} em um PDF válido`, async () => {
			const { kind: kindGerado, pdf } = await convertXmlToPdf(
				lerFixture(fixture),
			);

			assert.equal(kindGerado, kind);
			assert.equal(pdf.subarray(0, 5).toString("latin1"), "%PDF-");
			assert.ok(
				pdf.toString("latin1").trimEnd().endsWith("%%EOF"),
				"o PDF precisa estar completo — o stream foi coletado até o fim",
			);
			assert.ok(pdf.length > 10_000, "PDF suspeito de estar truncado");
		});
	}

	it("propaga erro de XML inválido como rejeição", async () => {
		await assert.rejects(() => convertXmlToPdf("nao é xml fiscal"), InvalidXmlError);
	});
});
