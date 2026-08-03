import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";

export const DIRETORIO_DE_FIXTURES = join(__dirname, "..", "fixtures");

export function lerFixture(nome: string): string {
	return readFileSync(join(DIRETORIO_DE_FIXTURES, `${nome}.xml`), "utf8");
}

/**
 * Zera o que muda a cada geração (data de criação, /ID, UUIDs) para que dois
 * PDFs gerados do mesmo XML possam ser comparados byte a byte.
 */
export function normalizarPdf(pdf: Buffer): string {
	return pdf
		.toString("latin1")
		.replace(/D:\d{14}Z?/g, "D:00000000000000")
		.replace(/\/ID \[[^\]]*\]/g, "/ID [X]")
		.replace(
			/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[+-]\d{2}:\d{2})?/g,
			"ISODATE",
		)
		.replace(
			/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/g,
			"UUID",
		);
}

/** Impressão digital estável do PDF, usada como golden. */
export function assinaturaDoPdf(pdf: Buffer): string {
	return createHash("sha256").update(normalizarPdf(pdf), "latin1").digest("hex");
}

/**
 * A tarja de homologação é desenhada com opacidade 0,2 — a única coisa no
 * layout que usa `/ca`, então sua presença identifica o ambiente.
 */
export function temTarjaDeHomologacao(pdf: Buffer): boolean {
	return pdf.toString("latin1").includes("/ca 0.2");
}
