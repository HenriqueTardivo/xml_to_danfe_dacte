import type Danfe from "@/modules/pdf_generator/danfe-dacte/lib/danfe";
import Gerador, {
	type GeradorCallback,
	type GeradorOpcoes,
} from "@/modules/pdf_generator/danfe-dacte/lib/gerador";

/** Layouts suportados — um por use-case (DANFE, DACTE e DACTE-OS). */
export type LayoutPDF = "danfe" | "cte" | "cteos";

const LAYOUTS: Record<
	LayoutPDF,
	(gerador: Gerador, opcoes: GeradorOpcoes, callback: GeradorCallback) => void
> = {
	danfe: (gerador, opcoes, callback) => gerador.gerarPDF(opcoes, callback),
	cte: (gerador, opcoes, callback) => gerador.gerarCTE(opcoes, callback),
	cteos: (gerador, opcoes, callback) => gerador.gerarCTEOS(opcoes, callback),
};

/** Ajustes de layout compartilhados pelos três documentos. */
const OPCOES_PADRAO: GeradorOpcoes = {
	ajusteYDoLogotipo: -4,
	ajusteYDaIdentificacaoDoEmitente: 4,
	creditos: "",
};

/** `tpAmb` da SEFAZ: "2" = homologação, qualquer outro valor = produção. */
function ambienteDe(tpAmb?: string): "homologacao" | "producao" {
	return tpAmb === "2" ? "homologacao" : "producao";
}

/**
 * Gera o PDF do `danfe` no layout pedido e resolve com o conteúdo em base64.
 *
 * O gerador entrega um stream do PDFKit já finalizado; aqui apenas acumulamos
 * os chunks e resolvemos no `end`, em vez de depender de um `setTimeout`.
 */
export function gerarPdfEmBase64(
	danfe: Danfe,
	layout: LayoutPDF,
	tpAmb?: string,
): Promise<string> {
	const opcoes: GeradorOpcoes = {
		...OPCOES_PADRAO,
		ambiente: ambienteDe(tpAmb),
	};

	return new Promise<string>((resolve, reject) => {
		LAYOUTS[layout](new Gerador(danfe), opcoes, (err, pdf) => {
			if (err) {
				reject(err);
				return;
			}

			const chunks: Buffer[] = [];

			pdf.on("data", (chunk: Buffer) => chunks.push(chunk));
			pdf.on("end", () => resolve(Buffer.concat(chunks).toString("base64")));
			pdf.on("error", reject);
		});
	});
}
