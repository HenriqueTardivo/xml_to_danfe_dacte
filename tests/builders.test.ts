import assert from "node:assert/strict";
import { describe, it } from "node:test";
import CteInfo from "@/modules/pdf_generator/danfe-dacte/lib/cteInfo";
import Danfe from "@/modules/pdf_generator/danfe-dacte/lib/danfe";
import Destinatario from "@/modules/pdf_generator/danfe-dacte/lib/destinatario";
import Duplicata from "@/modules/pdf_generator/danfe-dacte/lib/duplicata";
import Emitente from "@/modules/pdf_generator/danfe-dacte/lib/emitente";
import Endereco from "@/modules/pdf_generator/danfe-dacte/lib/endereco";
import Expeditor from "@/modules/pdf_generator/danfe-dacte/lib/expeditor";
import Fatura from "@/modules/pdf_generator/danfe-dacte/lib/fatura";
import Impostos from "@/modules/pdf_generator/danfe-dacte/lib/impostos";
import Item from "@/modules/pdf_generator/danfe-dacte/lib/item";
import Protocolo from "@/modules/pdf_generator/danfe-dacte/lib/protocolo";
import Recebedor from "@/modules/pdf_generator/danfe-dacte/lib/recebedor";
import Transportador from "@/modules/pdf_generator/danfe-dacte/lib/transportador";
import Volumes from "@/modules/pdf_generator/danfe-dacte/lib/volumes";

const MODELOS = {
	CteInfo,
	Danfe,
	Destinatario,
	Duplicata,
	Emitente,
	Endereco,
	Expeditor,
	Fatura,
	Impostos,
	Item,
	Protocolo,
	Recebedor,
	Transportador,
	Volumes,
	// biome-ignore lint/suspicious/noExplicitAny: varredura genérica sobre os modelos
} as unknown as Record<string, new () => any>;

/**
 * Setters que validam a entrada e por isso não aceitam `undefined` na
 * varredura — recebem um valor válido em vez de serem ignorados.
 */
const ARGUMENTO_VALIDO: Record<string, unknown> = {
	"Danfe.comOrientacao": "retrato",
	"Danfe.comNumero": "1",
	"Danfe.comFormularioDeSeguranca": { comDanfe: () => undefined },
};

function setters(instancia: object): string[] {
	const nomes = new Set<string>();

	for (
		let proto = Object.getPrototypeOf(instancia);
		proto && proto !== Object.prototype;
		proto = Object.getPrototypeOf(proto)
	) {
		for (const nome of Object.getOwnPropertyNames(proto)) {
			if (nome.startsWith("com")) nomes.add(nome);
		}
	}

	return [...nomes];
}

describe("builders dos modelos", () => {
	// Os use-cases encadeiam os setters de ponta a ponta; um `com*` que devolva
	// outra coisa quebra a cadeia inteira em tempo de execução.
	for (const [nome, Modelo] of Object.entries(MODELOS)) {
		it(`${nome}: todo com* devolve a própria instância`, () => {
			const instancia = new Modelo();

			for (const setter of setters(instancia)) {
				const argumento = ARGUMENTO_VALIDO[`${nome}.${setter}`];
				const retorno = instancia[setter](argumento);

				assert.equal(
					retorno,
					instancia,
					`${nome}.${setter} não devolveu \`this\` — a cadeia do builder quebra`,
				);
			}
		});
	}
});

describe("comportamentos legados congelados", () => {
	// Estes setters nunca guardaram o valor. O layout atual conta com isso: os
	// campos saem em branco no PDF. "Consertar" muda o documento impresso — se
	// for intencional, regrave o golden junto.
	it("Transportador não guarda placa nem UF da placa", () => {
		const transportador = new Transportador()
			.comPlacaDoVeiculo("ABC1234")
			.comUfDaPlacaDoVeiculo("SP");

		assert.equal(transportador.getPlacaDoVeiculo(), "");
		assert.equal(transportador.getUfDaPlacaDoVeiculo(), "");
	});

	it("Danfe não guarda a IE do substituto tributário", () => {
		const danfe = new Danfe().comInscricaoEstadualDoSubstitutoTributario("123");

		assert.equal(danfe.getInscricaoEstadualDoSubstitutoTributario(), "");
	});

	it("Impostos guarda o ICMS UF destino (setter de verdade)", () => {
		const impostos = new Impostos().comValorICMSufDest("10,00");

		assert.equal(impostos.getValorICMSufDest(), "10,00");
	});
});
