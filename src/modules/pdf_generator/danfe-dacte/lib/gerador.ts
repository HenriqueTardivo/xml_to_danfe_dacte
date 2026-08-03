import type Danfe from "@/modules/pdf_generator/danfe-dacte/lib/danfe";
import geradorDePdf from "@/modules/pdf_generator/danfe-dacte/lib/geradores/geradorDePdf";
import geradorPdfCTEOS from "@/modules/pdf_generator/danfe-dacte/lib/geradores/geradorPdfCteOs";
import gerarPdfCTE from "@/modules/pdf_generator/danfe-dacte/lib/geradores/gerarPdfCTE";

export type GeradorCallback = (err: Error, pdf: PDFKit.PDFDocument) => void;
// biome-ignore lint/suspicious/noExplicitAny: layout option bag is heterogeneous
export type GeradorOpcoes = Record<string, any>;

type OpcoesOuCallback = GeradorOpcoes | GeradorCallback;

function normalizar(
	opcoes: OpcoesOuCallback,
	callback?: GeradorCallback,
): [GeradorOpcoes, GeradorCallback] {
	if (typeof opcoes === "function") {
		return [{}, opcoes as GeradorCallback];
	}
	return [opcoes, callback as GeradorCallback];
}

export default class Gerador {
	private _danfe: Danfe;

	constructor(danfe: Danfe) {
		this._danfe = danfe;
	}

	gerarPDF(opcoes: OpcoesOuCallback, callback?: GeradorCallback) {
		const [opts, cb] = normalizar(opcoes, callback);
		geradorDePdf(this._danfe, opts, cb);
	}

	gerarCTE(opcoes: OpcoesOuCallback, callback?: GeradorCallback) {
		const [opts, cb] = normalizar(opcoes, callback);
		gerarPdfCTE(this._danfe, opts, cb);
	}

	gerarCTEOS(opcoes: OpcoesOuCallback, callback?: GeradorCallback) {
		const [opts, cb] = normalizar(opcoes, callback);
		geradorPdfCTEOS(this._danfe, opts, cb);
	}
}
