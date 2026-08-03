type Maybe = string | undefined;

export default class Fatura {
	_numero?: string;
	_valorOriginal?: string;
	_valorDoDesconto?: string;
	_valorLiquido?: string;
	_formaDePagamento?: string | null;

	getNumero(): string | undefined {
		return this._numero;
	}
	comNumero(_numero: Maybe): this {
		this._numero = _numero;
		return this;
	}
	getValorOriginal(): string | undefined {
		return this._valorOriginal;
	}
	getValorOriginalFormatado(): string | number {
		return this._valorOriginal || 0;
	}
	comValorOriginal(_valorOriginal: Maybe): this {
		this._valorOriginal = _valorOriginal;
		return this;
	}
	getValorDoDesconto(): string | undefined {
		return this._valorDoDesconto;
	}
	getValorDoDescontoFormatado(): string | number {
		return this._valorDoDesconto || 0;
	}
	comValorDoDesconto(_valorDoDesconto: Maybe): this {
		this._valorDoDesconto = _valorDoDesconto;
		return this;
	}
	getValorLiquido(): string | undefined {
		return this._valorLiquido;
	}
	getValorLiquidoFormatado(): string | number {
		return this._valorLiquido || 0;
	}
	comValorLiquido(_valorLiquido: Maybe): this {
		this._valorLiquido = _valorLiquido;
		return this;
	}
	getFormaDePagamento(): string | undefined {
		return {
			0: "A VISTA",
			1: "A PRAZO",
			2: "OUTROS",
		}[this.getCodFormaDePagamento() as unknown as number];
	}
	comFormaDePagamento(_formaDePagamento: Maybe): this {
		this._formaDePagamento = _formaDePagamento;
		return this;
	}
	getCodFormaDePagamento(): string | null | undefined {
		return this._formaDePagamento;
	}
	removerFormaDePagamento(): this {
		this._formaDePagamento = null;
		return this;
	}
}
