import Pessoa from "@/modules/pdf_generator/danfe-dacte/lib/pessoa";

type Maybe = string | undefined;

export default class Emitente extends Pessoa {
	_logotipo?: string;
	_inscricaoMunicipal?: string;

	getLogotipo(): string {
		return this._logotipo || "";
	}
	comLogotipo(_logotipo: Maybe): this {
		this._logotipo = _logotipo;
		return this;
	}
	getInscricaoMunicipal(): string {
		return this._inscricaoMunicipal || "";
	}
	comInscricaoMunicipal(_inscricaoMunicipal: Maybe): this {
		this._inscricaoMunicipal = _inscricaoMunicipal;
		return this;
	}
}
