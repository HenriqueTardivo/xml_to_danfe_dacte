type Maybe = string | undefined;

export default class Duplicata {
	_numero?: string;
	_vencimento?: string;
	_valor?: string;

	getNumero(): string | undefined {
		return this._numero;
	}
	comNumero(_numero: Maybe): this {
		this._numero = _numero;
		return this;
	}
	getVencimento(): string | undefined {
		return this._vencimento;
	}
	getVencimentoFormatado(): string {
		if (this._vencimento) {
			return this._vencimento;
		}
		return "";
	}
	comVencimento(_vencimento: Maybe): this {
		this._vencimento = _vencimento;
		return this;
	}
	getValor(): string | undefined {
		return this._valor;
	}
	getValorFormatado(): string | number {
		return this._valor || 0;
	}
	comValor(_valor: Maybe): this {
		this._valor = _valor;
		return this;
	}
}
