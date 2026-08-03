import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
	cep,
	cnpj,
	data,
	dataHora,
	hora,
	lista,
	maiusculas,
	numero,
	primeiro,
	texto,
} from "@/utils/campos-do-xml";

describe("campos-do-xml", () => {
	describe("texto", () => {
		it("lê o valor do nó e tolera ausência", () => {
			assert.equal(texto({ _text: "123" }), "123");
			assert.equal(texto(undefined), undefined);
			assert.equal(texto({}), undefined);
		});
	});

	describe("lista", () => {
		it("normaliza o objeto-ou-array do xml-js", () => {
			assert.deepEqual(lista(undefined), []);
			assert.deepEqual(lista({ a: 1 }), [{ a: 1 }]);
			assert.deepEqual(lista([{ a: 1 }, { a: 2 }]), [{ a: 1 }, { a: 2 }]);
		});

		it("trata uma ocorrência única igual a uma lista de um item", () => {
			const unico = lista({ chave: { _text: "x" } });
			const varios = lista([{ chave: { _text: "x" } }]);
			assert.deepEqual(unico, varios);
		});
	});

	describe("primeiro", () => {
		it("devolve o primeiro nó preenchido", () => {
			const b = { _text: "b" };
			assert.equal(primeiro(undefined, b), b);
			assert.equal(primeiro({ _text: "a" }, b)?._text, "a");
		});

		it("ignora nó existente com texto vazio, como o `||` do código antigo", () => {
			assert.equal(primeiro({ _text: "" }, { _text: "b" })?._text, "b");
			assert.equal(primeiro(undefined, undefined), undefined);
		});
	});

	describe("numero", () => {
		it("formata em pt-BR", () => {
			assert.equal(numero({ _text: "1234.5" }), "1.234,50");
			assert.equal(numero({ _text: "0" }), "0,00");
		});

		it("devolve 0,00 quando o campo não existe", () => {
			assert.equal(numero(undefined), "0,00");
		});
	});

	describe("datas", () => {
		it("formata data, hora e data-hora", () => {
			const no = { _text: "2011-07-05T14:42:56" };
			assert.equal(data(no), "05/07/2011");
			assert.equal(hora(no), "14:42:56");
			assert.equal(dataHora(no), "05/07/2011 14:42:56");
		});

		it("devolve string vazia quando o campo não existe", () => {
			assert.equal(data(undefined), "");
			assert.equal(dataHora(undefined), "");
		});
	});

	describe("máscaras de documento", () => {
		it("formata CNPJ e CEP", () => {
			assert.equal(cnpj({ _text: "99999994018888" }), "99.999.994/0188-88");
			assert.equal(cep({ _text: "14940000" }), "14.940-000");
		});

		it("devolve string vazia quando o campo não existe", () => {
			assert.equal(cnpj(undefined), "");
			assert.equal(cep(undefined), "");
		});
	});

	describe("maiusculas", () => {
		it("sobe a caixa do valor", () => {
			assert.equal(maiusculas({ _text: "Jaboticabal" }), "JABOTICABAL");
		});

		// Comportamento legado: o código antigo fazia String(undefined) e o DACTE
		// imprime "UNDEFINED" quando o município falta. Preservado de propósito —
		// mudar isso altera o PDF gerado.
		it("preserva o String(undefined) do código legado", () => {
			assert.equal(maiusculas(undefined), "UNDEFINED");
		});
	});
});
