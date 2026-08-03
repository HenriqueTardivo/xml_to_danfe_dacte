type Maybe = string | undefined;
type Valor = string | number | undefined;

function formatarAliquota(aliquota: Valor): string {
	const parteDecimal = String(aliquota).split(".");
	let resultado: string | number;

	if (parteDecimal.length > 1) {
		resultado = parteDecimal[1];

		if (resultado.length > 2) {
			resultado = resultado.replace(".", ",");
		}

		resultado = Number.parseFloat(resultado); //Remover os zeros a esquerda
	} else {
		resultado = "0";
	}

	return `${resultado}%`;
}

export default class Item {
	_codigo?: string;
	_descricao?: string;
	_informacoesAdicionais?: string;
	_ncmSh?: string;
	_oCst?: string;
	_cfop?: string;
	_unidade?: string;
	_quantidade?: Valor;
	_valorUnitario?: Valor;
	_valorTotal?: Valor;
	_baseDeCalculoDoIcms?: Valor;
	_valorDoIcms?: Valor;
	_valorDoIpi?: Valor;
	_aliquotaDoIcms?: Valor;
	_aliquotaDoIpi?: Valor;

	getCodigo(): string {
		return this._codigo || "";
	}
	comCodigo(_codigo: Maybe): this {
		this._codigo = _codigo;
		return this;
	}
	getDescricao(): string {
		return this._descricao || "";
	}
	comDescricao(_descricao: Maybe): this {
		this._descricao = _descricao;
		return this;
	}
	getInformacoesAdicionais(): string | undefined {
		return this._informacoesAdicionais;
	}
	comInformacoesAdicionais(_informacoesAdicionais: Maybe): this {
		this._informacoesAdicionais = _informacoesAdicionais;
		return this;
	}
	getNcmSh(): string {
		return this._ncmSh || "";
	}
	comNcmSh(_ncmSh: Maybe): this {
		this._ncmSh = _ncmSh;
		return this;
	}
	getOCst(): string {
		return this._oCst || "";
	}
	comOCst(_oCst: Maybe): this {
		this._oCst = _oCst;
		return this;
	}
	getCfop(): string {
		return this._cfop || "";
	}
	comCfop(_cfop: Maybe): this {
		this._cfop = _cfop;
		return this;
	}
	getUnidade(): string {
		return this._unidade || "";
	}
	comUnidade(_unidade: Maybe): this {
		this._unidade = _unidade;
		return this;
	}
	getQuantidade(): Valor {
		return this._quantidade || 0;
	}
	getQuantidadeFormatada(): Valor {
		return this.getQuantidade();
	}
	comQuantidade(_quantidade: Valor): this {
		if ((_quantidade as number) < 0) {
			throw new Error("Quantidade não pode ser inferior a zero");
		}
		this._quantidade = _quantidade;
		return this;
	}
	getValorUnitario(): Valor {
		return this._valorUnitario || 0;
	}
	getValorUnitarioFormatado(): { simbolo: string } {
		return (this.getValorUnitario(), { simbolo: "" });
	}
	comValorUnitario(_valorUnitario: Valor): this {
		if ((_valorUnitario as number) < 0) {
			throw new Error("Valor unitário não pode ser inferior a zero");
		}
		this._valorUnitario = _valorUnitario;
		return this;
	}
	getValorTotal(): Valor {
		return this._valorTotal || 0;
	}
	getValorTotalFormatado(): { simbolo: string } {
		return (this.getValorTotal(), { simbolo: "" });
	}
	comValorTotal(_valorTotal: Valor): this {
		if ((_valorTotal as number) < 0) {
			throw new Error("Valor total não pode ser inferior a zero");
		}
		this._valorTotal = _valorTotal;
		return this;
	}
	//Embora os valores daqui para baixo sejam numéricos
	//eu deixei retornando string vazio por padrão
	getBaseDeCalculoDoIcms(): Valor {
		return this._baseDeCalculoDoIcms || "";
	}
	getBaseDeCalculoDoIcmsFormatada(): string | { simbolo: string } {
		if (!this.getBaseDeCalculoDoIcms()) {
			return "";
		}
		return (this.getBaseDeCalculoDoIcms(), { simbolo: "" });
	}
	comBaseDeCalculoDoIcms(_baseDeCalculoDoIcms: Valor): this {
		if ((_baseDeCalculoDoIcms as number) < 0) {
			throw new Error("Base de cálculo do icms não pode ser inferior a zero");
		}
		this._baseDeCalculoDoIcms = _baseDeCalculoDoIcms;
		return this;
	}
	getValorDoIcms(): Valor {
		return this._valorDoIcms || "";
	}
	getValorDoIcmsFormatado(): string | { simbolo: string } {
		if (!this.getValorDoIcms()) {
			return "";
		}
		return (this.getValorDoIcms(), { simbolo: "" });
	}
	comValorDoIcms(_valorDoIcms: Valor): this {
		if ((_valorDoIcms as number) < 0) {
			throw new Error("Valor do icms não pode ser inferior a zero");
		}
		this._valorDoIcms = _valorDoIcms;
		return this;
	}
	getValorDoIpi(): Valor {
		return this._valorDoIpi || "";
	}
	getValorDoIpiFormatado(): string | { simbolo: string } {
		if (!this.getValorDoIpi()) {
			return "";
		}
		return (this.getValorDoIpi(), { simbolo: "" });
	}
	comValorDoIpi(_valorDoIpi: Valor): this {
		if ((_valorDoIpi as number) < 0) {
			throw new Error("Valor do ipi não pode ser inferior a zero");
		}
		this._valorDoIpi = _valorDoIpi;
		return this;
	}
	getAliquotaDoIcms(): Valor {
		return this._aliquotaDoIcms || "";
	}
	getAliquotaDoIcmsFormatada(): string {
		if (this.getAliquotaDoIcms() !== "") {
			return formatarAliquota(this.getAliquotaDoIcms());
		}
		return "";
	}
	comAliquotaDoIcms(_aliquotaDoIcms: Valor): this {
		if ((_aliquotaDoIcms as number) < 0 || (_aliquotaDoIcms as number) >= 1) {
			throw new Error("Aliquota do icms deve estar entre 0 e 1");
		}
		this._aliquotaDoIcms = _aliquotaDoIcms;
		return this;
	}
	getAliquotaDoIpi(): Valor {
		return this._aliquotaDoIpi || "";
	}
	getAliquotaDoIpiFormatada(): string {
		if (this.getAliquotaDoIpi() !== "") {
			return formatarAliquota(this.getAliquotaDoIpi());
		}
		return "";
	}
	comAliquotaDoIpi(_aliquotaDoIpi: Valor): this {
		if ((_aliquotaDoIpi as number) < 0 || (_aliquotaDoIpi as number) >= 1) {
			throw new Error("Aliquota do icms deve estar entre 0 e 1");
		}
		this._aliquotaDoIpi = _aliquotaDoIpi;
		return this;
	}
}
