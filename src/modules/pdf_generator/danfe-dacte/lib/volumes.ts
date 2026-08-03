type Maybe = string | undefined;

export default class Volumes {
	_quantidade?: string | number;
	_especie?: string;
	_marca?: string;
	_numeracao?: string;
	_pesoBruto?: string;
	_pesoLiquido?: string;

	getQuantidade(): string | number {
		return this._quantidade || 0;
	}
	getQuantidadeFormatada(): string | number {
		return this.getQuantidade();
	}
	comQuantidade(_quantidade: string | number | undefined): this {
		this._quantidade = _quantidade;
		return this;
	}
	getEspecie(): string {
		return this._especie || "";
	}
	comEspecie(_especie: Maybe): this {
		this._especie = _especie;
		return this;
	}
	getMarca(): string {
		return this._marca || "";
	}
	comMarca(_marca: Maybe): this {
		this._marca = _marca;
		return this;
	}
	getNumeracao(): string {
		return this._numeracao || "";
	}
	comNumeracao(_numeracao: Maybe): this {
		this._numeracao = _numeracao;
		return this;
	}
	getPesoBruto(): string {
		return this._pesoBruto || "";
	}
	comPesoBruto(_pesoBruto: Maybe): this {
		this._pesoBruto = _pesoBruto;
		return this;
	}
	getPesoLiquido(): string {
		return this._pesoLiquido || "";
	}
	comPesoLiquido(_pesoLiquido: Maybe): this {
		this._pesoLiquido = _pesoLiquido;
		return this;
	}
}
