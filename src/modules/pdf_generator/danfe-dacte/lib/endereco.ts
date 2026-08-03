type Maybe = string | undefined;

export default class Endereco {
	_logradouro?: string;
	_numero?: string;
	_complemento?: string;
	_bairro?: string;
	_cidade?: string;
	_cep?: string;
	_municipio?: string;
	_uf?: string;
	_pais?: string;

	getLogradouro(): string {
		return this._logradouro || "";
	}
	comLogradouro(_logradouro: Maybe): this {
		this._logradouro = _logradouro;
		return this;
	}
	getNumero(): string {
		return this._numero || "";
	}
	comNumero(_numero: Maybe): this {
		this._numero = _numero;
		return this;
	}
	getComplemento(): string {
		return this._complemento || "";
	}
	comComplemento(_complemento: Maybe): this {
		this._complemento = _complemento;
		return this;
	}
	getBairro(): string {
		return this._bairro || "";
	}
	comBairro(_bairro: Maybe): this {
		this._bairro = _bairro;
		return this;
	}
	getCidade(): string {
		return this._cidade || "";
	}
	comCidade(_cidade: Maybe): this {
		this._cidade = _cidade;
		return this;
	}
	getCep(): string {
		return this._cep || "";
	}
	getCepFormatado(): string {
		return this.getCep();
	}
	comCep(_cep: Maybe): this {
		this._cep = _cep;
		return this;
	}
	getMunicipio(): string {
		return this._municipio || "";
	}
	comMunicipio(_municipio: Maybe): this {
		this._municipio = _municipio;
		return this;
	}
	getUf(): string {
		return this._uf || "";
	}
	comUf(_uf: Maybe): this {
		if (!_uf) {
			return this;
		}
		this._uf = _uf.toUpperCase();
		return this;
	}
	comPais(_pais: Maybe): this {
		if (!_pais) {
			return this;
		}
		this._pais = _pais.toUpperCase();
		return this;
	}
	getPais(): string {
		return this._pais || "";
	}
	getPrimeiraLinha(): string {
		return [this.getLogradouro(), this.getNumero(), this.getComplemento()]
			.filter((dados) => dados)
			.join(" ");
	}
	getSegundaLinha(): string {
		let resultado = "";

		if (this.getBairro()) {
			resultado += this.getBairro();
		}

		if (this.getBairro() && this.getCidade()) {
			resultado += ", ";
		}

		if (this.getCidade()) {
			resultado += this.getCidade();
		}

		if (resultado && this.getUf()) {
			resultado += "/";
		}

		if (this.getUf()) {
			resultado += this.getUf();
		}

		if (resultado && this.getCep()) {
			resultado += " — ";
		}

		if (this.getCep()) {
			resultado += this.getCepFormatado();
		}

		return resultado;
	}
}
