import Endereco from "@/modules/pdf_generator/danfe-dacte/lib/endereco";

type Maybe = string | undefined;

export default class Pessoa {
	_nome?: string;
	_registroNacional?: string;
	_endereco: Endereco;
	_inscricaoEstadual?: string;
	_telefone?: string;
	_email?: string;

	constructor() {
		this._endereco = new Endereco();
		this.comEndereco(new Endereco());
	}

	getNome(): string {
		return this._nome || "";
	}
	comNome(_nome: Maybe): this {
		this._nome = _nome;
		return this;
	}

	getRegistroNacional(): string {
		return this._registroNacional || "";
	}
	getRegistroNacionalFormatado(): string {
		return this.getRegistroNacional();
	}
	comRegistroNacional(_registroNacional: Maybe): this {
		this._registroNacional = _registroNacional;
		return this;
	}

	getEndereco(): Endereco {
		return this._endereco;
	}
	comEndereco(_endereco: Endereco): this {
		this._endereco = _endereco;
		return this;
	}

	getInscricaoEstadual(): string {
		return this._inscricaoEstadual || "";
	}
	comInscricaoEstadual(_inscricaoEstadual: Maybe): this {
		this._inscricaoEstadual = _inscricaoEstadual;
		return this;
	}

	getTelefone(): string {
		return this._telefone || "";
	}
	getTelefoneFormatado(): string {
		return this.getTelefone();
	}
	comTelefone(_telefone: Maybe): this {
		this._telefone = _telefone;
		return this;
	}

	getEmail(): string {
		return this._email || "";
	}
	comEmail(_email: Maybe): this {
		this._email = _email;
		return this;
	}
}
