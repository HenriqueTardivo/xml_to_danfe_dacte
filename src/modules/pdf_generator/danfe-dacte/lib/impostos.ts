type Maybe = string | undefined;
type Valor = string | number | undefined;

/**
 * Preserves the original (quirky) legacy behaviour verbatim, including the
 * `getXFormatado` helpers that use the comma operator and evaluate to
 * `{ simbolo: "" }`, and `getTpIcms` which references a method that no longer
 * exists (dead code kept for parity).
 */
export default class Impostos {
	_baseDeCalculoDoIcms?: Valor;
	_valorDoIcms?: Valor;
	_baseDeCalculoDoIcmsSt?: Valor;
	_ValorDoIcmsSt?: Valor;
	_valorDoImpostoDeImportacao?: Valor;
	_valorDoPis?: Valor;
	_valorTotalDoIpi?: Valor;
	_valorDaCofins?: Valor;
	_baseDeCalculoDoIssqn?: Valor;
	_valorTotalDoIssqn?: Valor;
	_valorICMSufDest?: Valor;
	_valorICMSufRemet?: Valor;
	_valorFCP?: Valor;
	_stringSitTrib?: Maybe;
	_valorTotTrib?: Valor;

	getBaseDeCalculoDoIcms(): Valor {
		return this._baseDeCalculoDoIcms || 0;
	}
	getBaseDeCalculoDoIcmsFormatada(): Valor {
		return this.getBaseDeCalculoDoIcms();
	}
	comBaseDeCalculoDoIcms(_baseDeCalculoDoIcms: Valor): this {
		this._baseDeCalculoDoIcms = _baseDeCalculoDoIcms;
		return this;
	}
	getValorDoIcms(): Valor {
		return this._valorDoIcms || 0;
	}
	getValorDoIcmsFormatado(): { simbolo: string } {
		return (this.getValorDoIcms(), { simbolo: "" });
	}
	comValorDoIcms(_valorDoIcms: Valor): this {
		this._valorDoIcms = _valorDoIcms;
		return this;
	}
	getBaseDeCalculoDoIcmsSt(): Valor {
		return this._baseDeCalculoDoIcmsSt || 0;
	}
	getBaseDeCalculoDoIcmsStFormatada(): { simbolo: string } {
		return (this.getBaseDeCalculoDoIcmsSt(), { simbolo: "" });
	}
	comBaseDeCalculoDoIcmsSt(_baseDeCalculoDoIcmsSt: Valor): this {
		this._baseDeCalculoDoIcmsSt = _baseDeCalculoDoIcmsSt;
		return this;
	}
	getValorDoIcmsSt(): Valor {
		return this._ValorDoIcmsSt || 0;
	}
	getValorDoIcmsStFormatado(): { simbolo: string } {
		return (this.getValorDoIcmsSt(), { simbolo: "" });
	}
	comValorDoIcmsSt(_ValorDoIcmsSt: Valor): this {
		this._ValorDoIcmsSt = _ValorDoIcmsSt;
		return this;
	}
	getTpIcms(): string {
		const map: Record<string, string> = {
			"00": "Tributada Integralmente",
			40: "Isenta",
			41: "Não Tributada",
			51: "Diferimento",
			90: "Regime Normal",
		};
		// biome-ignore lint/suspicious/noExplicitAny: dead code kept for parity
		return map[(this as any).getIcms()] || "";
	}
	getValorDoImpostoDeImportacao(): Valor {
		return this._valorDoImpostoDeImportacao || 0;
	}
	getValorDoImpostoDeImportacaoFormatado(): { simbolo: string } {
		return (this.getValorDoImpostoDeImportacao(), { simbolo: "" });
	}
	comValorDoImpostoDeImportacao(_valorDoImpostoDeImportacao: Valor): this {
		this._valorDoImpostoDeImportacao = _valorDoImpostoDeImportacao;
		return this;
	}
	getValorDoPis(): Valor {
		return this._valorDoPis || 0;
	}
	getValorDoPisFormatado(): { simbolo: string } {
		return (this.getValorDoPis(), { simbolo: "" });
	}
	comValorDoPis(_valorDoPis: Valor): this {
		this._valorDoPis = _valorDoPis;
		return this;
	}
	getValorTotalDoIpi(): Valor {
		return this._valorTotalDoIpi || 0;
	}
	getValorTotalDoIpiFormatado(): { simbolo: string } {
		return (this.getValorTotalDoIpi(), { simbolo: "" });
	}
	comValorTotalDoIpi(_valorTotalDoIpi: Valor): this {
		this._valorTotalDoIpi = _valorTotalDoIpi;
		return this;
	}
	getValorDaCofins(): Valor {
		return this._valorDaCofins || 0;
	}
	getValorDaCofinsFormatado(): { simbolo: string } {
		return (this.getValorDaCofins(), { simbolo: "" });
	}
	comValorDaCofins(_valorDaCofins: Valor): this {
		this._valorDaCofins = _valorDaCofins;
		return this;
	}
	getBaseDeCalculoDoIssqn(): Valor {
		return this._baseDeCalculoDoIssqn || 0;
	}
	getBaseDeCalculoDoIssqnFormatada(): { simbolo: string } {
		return (this.getBaseDeCalculoDoIssqn(), { simbolo: "" });
	}
	comBaseDeCalculoDoIssqn(_baseDeCalculoDoIssqn: Valor): this {
		this._baseDeCalculoDoIssqn = _baseDeCalculoDoIssqn;
		return this;
	}
	getValorTotalDoIssqn(): Valor {
		return this._valorTotalDoIssqn || 0;
	}
	getValorTotalDoIssqnFormatado(): { simbolo: string } {
		return (this.getValorTotalDoIssqn(), { simbolo: "" });
	}
	comValorTotalDoIssqn(_valorTotalDoIssqn: Valor): this {
		this._valorTotalDoIssqn = _valorTotalDoIssqn;
		return this;
	}
	comValorICMSufDest(_valorICMSufDest: Valor): this {
		this._valorICMSufDest = _valorICMSufDest;
		return this;
	}
	getValorICMSufDest(): Valor {
		return this._valorICMSufDest;
	}
	comValorICMSufRemet(_valorICMSufRemet: Valor): this {
		this._valorICMSufRemet = _valorICMSufRemet;
		return this;
	}
	getValorICMSufRemet(): Valor {
		return this._valorICMSufRemet;
	}
	comValorFCP(_valorFCP: Valor): this {
		this._valorFCP = _valorFCP;
		return this;
	}
	getValorFCP(): Valor {
		return this._valorFCP;
	}
	comSitTrib(_stringSitTrib: Maybe): this {
		this._stringSitTrib = _stringSitTrib;
		return this;
	}
	getSitTrib(): Maybe {
		return this._stringSitTrib;
	}
	getValorTotTrib(): Valor {
		return this._valorTotTrib;
	}
	comValorTotTrib(_valorTotTrib: Valor): this {
		this._valorTotTrib = _valorTotTrib;
		return this;
	}
}
