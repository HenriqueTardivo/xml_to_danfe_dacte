type Maybe = string | undefined;

export default class Protocolo {
	_codigo?: string;
	_data?: string;

	getCodigo(): string {
		return this._codigo || "";
	}
	comCodigo(_codigo: Maybe): this {
		this._codigo = _codigo;
		return this;
	}
	getData(): string | undefined {
		return this._data;
	}
	getDataFormatada(): string {
		if (this.getData()) {
			return this.getData() as string;
		}
		return "";
	}
	comData(_data: Maybe): this {
		this._data = _data;
		return this;
	}
	getFormatacao(): string {
		let resultado = "";

		if (this.getCodigo()) {
			resultado += this.getCodigo();
		}

		if (this.getCodigo() && this.getData()) {
			resultado += " - ";
		}

		if (this.getData()) {
			resultado += this.getDataFormatada();
		}

		return resultado;
	}
}
