import type Danfe from "@/modules/pdf_generator/danfe-dacte/lib/danfe";

// biome-ignore lint/suspicious/noExplicitAny: mirrors the loose legacy setters
type BoolLike = boolean | string | number | any;

export default class FormularioDeSeguranca {
	_danfe!: Danfe;
	_destaqueDeIcmsProprio?: boolean;
	_destaqueDeIcmsPorST?: boolean;
	_privateAttribute?: Date;
	_justificativa?: string;

	getDanfe(): Danfe {
		return this._danfe;
	}
	comDanfe(_danfe: Danfe): this {
		this._danfe = _danfe;
		return this;
	}
	getDadosDaNfe() {
		return {
			uf: this.getDanfe().getEmitente().getEndereco().getUf(),
			tipoDeEmissao: 5,
			cnpj: this.getDanfe().getEmitente().getRegistroNacional(),
			valorDaNfe: this.getDanfe().getValorTotalDaNota(),
			destaqueDeIcmsProprio: this.getDestaqueDeIcmsProprio(),
			destaqueDeIcmsPorST: this.getDestaqueDeIcmsPorST(),
			dataDeEmissao: this.getDanfe().getDataDaEmissao(),
		};
	}
	getDadosDaNfeFormatado() {
		return this.getDadosDaNfe();
	}
	getDestaqueDeIcmsProprio(): boolean | undefined {
		return this._destaqueDeIcmsProprio;
	}
	comDestaqueDeIcmsProprio(_destaqueDeIcmsProprio: BoolLike): this {
		if (typeof _destaqueDeIcmsProprio === "boolean") {
			this._destaqueDeIcmsProprio = _destaqueDeIcmsProprio;
		}
		if (typeof _destaqueDeIcmsProprio === "string") {
			this._destaqueDeIcmsProprio = _destaqueDeIcmsProprio === "true";
		}
		if (typeof _destaqueDeIcmsProprio === "number") {
			this._destaqueDeIcmsProprio = _destaqueDeIcmsProprio === 1;
		}
		return this;
	}
	getDestaqueDeIcmsPorST(): boolean | undefined {
		return this._destaqueDeIcmsPorST;
	}
	comDestaqueDeIcmsPorST(_destaqueDeIcmsPorST: BoolLike): this {
		if (typeof _destaqueDeIcmsPorST === "boolean") {
			this._destaqueDeIcmsPorST = _destaqueDeIcmsPorST;
		}
		if (typeof _destaqueDeIcmsPorST === "string") {
			this._destaqueDeIcmsPorST = _destaqueDeIcmsPorST === "true";
		}
		if (typeof _destaqueDeIcmsPorST === "number") {
			this._destaqueDeIcmsPorST = _destaqueDeIcmsPorST === 1;
		}
		return this;
	}
	getDataDaEntradaEmContingencia(): Date | undefined {
		return this._privateAttribute;
	}
	comDataDaEntradaEmContingencia(_privateAttribute: string | number | Date): this {
		this._privateAttribute = new Date(_privateAttribute);
		return this;
	}
	// NOTE: legacy quirk preserved — returns the method reference, not its result.
	getDataDaEntradaEmContingenciaFormatada(): unknown {
		return this.getDataDaEntradaEmContingencia;
	}
	getJustificativa(): string {
		return this._justificativa || "";
	}
	comJustificativa(_justificativa: string | undefined): this {
		if (!_justificativa || _justificativa.length < 15) {
			throw new Error(
				[
					"A justificativa para entrada em contingência deve conter",
					"pelo menos 15 caracteres",
				].join(""),
			);
		}
		this._justificativa = _justificativa.substr(0, 255);
		return this;
	}
}
