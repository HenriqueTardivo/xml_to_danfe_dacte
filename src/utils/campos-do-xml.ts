import { MaskFields } from "@/utils/MaskFields";

/**
 * Leitores para o JSON produzido pelo `xml-js`.
 *
 * O conversor representa todo elemento folha como `{ _text: "valor" }` e, para
 * elementos repetidos, ora entrega um objeto (1 ocorrência) ora um array (N).
 * Estes helpers escondem esses dois detalhes para que os use-cases falem apenas
 * o vocabulário do documento fiscal.
 */

/** Elemento folha do xml-js. */
export interface NoDeTexto {
	_text?: string;
}

const mask = new MaskFields();

/** Valor bruto de um nó folha — substitui o `?._text` repetido. */
export function texto(no?: NoDeTexto): string | undefined {
	return no?._text;
}

/** Normaliza "objeto ou array" em array, sempre iterável. */
export function lista<T>(no: T | T[] | undefined | null): T[] {
	if (!no) return [];
	return Array.isArray(no) ? no : [no];
}

/**
 * Primeiro nó realmente preenchido — equivale ao encadeamento
 * `a?._text || b?._text || ...` usado para campos alternativos do layout.
 */
export function primeiro(
	...nos: (NoDeTexto | undefined)[]
): NoDeTexto | undefined {
	return nos.find((no) => texto(no));
}

/** Valor monetário/quantidade no formato pt-BR (`0,00` quando ausente). */
export function numero(no?: NoDeTexto): string {
	return mask.maskNumber(texto(no));
}

/** Data no formato dd/mm/aaaa. */
export function data(no?: NoDeTexto): string {
	return mask.maskDate(texto(no));
}

/** Data e hora no formato dd/mm/aaaa hh:mm:ss. */
export function dataHora(no?: NoDeTexto): string {
	return mask.maskDateTime(texto(no));
}

/** Hora no formato hh:mm:ss. */
export function hora(no?: NoDeTexto): string {
	return mask.maskTime(texto(no));
}

/** CNPJ formatado (00.000.000/0000-00). */
export function cnpj(no?: NoDeTexto): string {
	return mask.maskCnpj(texto(no));
}

/** CEP formatado (00.000-000). */
export function cep(no?: NoDeTexto): string {
	return mask.maskCEP(texto(no));
}

/** Texto em caixa alta, preservando o `String(undefined)` do código legado. */
export function maiusculas(no?: NoDeTexto): string {
	return String(texto(no)).toUpperCase();
}
