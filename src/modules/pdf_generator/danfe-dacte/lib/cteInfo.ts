type Maybe = string | undefined;
// XML nodes coming from xml-js are dynamically shaped; typed loosely on purpose.
// biome-ignore lint/suspicious/noExplicitAny: dynamic xml-js payloads
type Xml = any;

const lookup = (map: Record<string, string>, key: Maybe): string =>
	(key !== undefined && map[key]) || "";

export default class CteInfo {
	_tpCte?: string;
	_tpServ?: string;
	_toma?: string;
	_modalidadeDoFrete?: string;
	_cfopFrete?: string;
	_natOp?: string;
	_cfop?: string;
	_inicioPrestacao?: string;
	_finalPrestacao?: string;
	_modelo?: string;
	_prodPred?: string;
	_cubagem?: string;
	_volume?: string;
	_medidas?: Xml;
	_observacao?: string;
	_RNTRC?: string;
	_CIOT?: string;
	_dataEntrega?: string;
	_compServ?: Xml;
	_caracCarga?: string;
	_comDescServico?: string;
	_comNumEstadual?: string;
	_comPlaca?: string;
	_comRenavam?: string;
	_comUF?: string;
	_xSeg?: string;
	_xResp?: string;
	_nApol?: string;
	_rodoTaf?: Xml;
	_cargaOS?: Xml;

	// TIPO CTE
	comTpCte(_tpCte: Maybe): this {
		this._tpCte = _tpCte;
		return this;
	}
	getCodTpCte(): Maybe {
		return this._tpCte;
	}
	getTpCte(): string {
		return lookup(
			{ 0: "Normal", 1: "Complemento", 2: "Anulação", 3: "Substituto" },
			this.getCodTpCte(),
		);
	}
	//TIPO SERVIÇO
	comTpServ(_tpServ: Maybe): this {
		this._tpServ = _tpServ;
		return this;
	}
	getCodTpServ(): Maybe {
		return this._tpServ;
	}
	getTpServ(): string {
		return lookup(
			{
				0: "Normal",
				1: "Subcontratação",
				2: "Redespacho",
				3: "Redespacho Intermediário",
				4: "Multimodal",
			},
			this.getCodTpServ(),
		);
	}
	getTipoServ(): string {
		return lookup(
			{
				6: "Transporte de Pessoas",
				7: "Transporte de Valores",
				8: "Excesso de Bagagem",
			},
			this.getCodTpServ(),
		);
	}
	//TOMADOR DO SERVIÇO -- tag 'toma' no xml
	comToma(_toma: Maybe): this {
		this._toma = _toma;
		return this;
	}
	getCodToma(): Maybe {
		return this._toma;
	}
	getToma(): string {
		return lookup(
			{ 0: "Remetente", 1: "Expeditor", 2: "Recebedor", 3: "Destinatario" },
			this.getCodToma(),
		);
	}
	//MODAL DE FRETE
	comModalFrete(_modalidadeDoFrete: Maybe): this {
		this._modalidadeDoFrete = _modalidadeDoFrete;
		return this;
	}
	getModalCodFrete(): Maybe {
		return this._modalidadeDoFrete;
	}
	getModalFrete(): string {
		return lookup(
			{
				"01": "Rodoviario",
				"02": "Aéreo",
				"03": "Aquaviário",
				"04": "Ferroviário",
				"05": "Dutoviário",
				"06": "Multimodal",
			},
			this.getModalCodFrete(),
		);
	}
	//CFOP FRETE
	comCfopFrete(_cfopFrete: Maybe): this {
		this._cfopFrete = _cfopFrete;
		return this;
	}
	getCfopFrete(): Maybe {
		return this._cfopFrete;
	}
	comNatOp(_natOp: Maybe): this {
		this._natOp = _natOp;
		return this;
	}
	getNatOp(): Maybe {
		return this._natOp;
	}
	comCFOP(_cfop: Maybe): this {
		this._cfop = _cfop;
		return this;
	}
	getCFOP(): Maybe {
		return this._cfop;
	}
	//INICIO DA PRESTAÇÃO -- Enviar concatenado municipio e uf
	comInicioPrestacao(_inicioPrestacao: Maybe): this {
		this._inicioPrestacao = _inicioPrestacao;
		return this;
	}
	getInicioPrestacao(): Maybe {
		return this._inicioPrestacao;
	}
	// FINAL DA PRESTAÇÃO -- Enviar concatenado municipio e uf
	comFinalDaPrestacao(_finalPrestacao: Maybe): this {
		this._finalPrestacao = _finalPrestacao;
		return this;
	}
	getFinalDaPrestacao(): Maybe {
		return this._finalPrestacao;
	}
	//MODELO
	comModelo(_modelo: Maybe): this {
		this._modelo = _modelo;
		return this;
	}
	getModelo(): Maybe {
		return this._modelo;
	}
	//PRODUTO PREDOMINANTE
	comProdPred(_prodPred: Maybe): this {
		if (_prodPred) {
			this._prodPred = String(_prodPred).toUpperCase();
		}
		return this;
	}
	getProdPred(): Maybe {
		return this._prodPred;
	}
	//MANIPULAÇAO DE SERVIÇO CTEOS
	getPrestServ(_prestServ: Maybe): this {
		if (_prestServ) {
			this._prodPred = String(_prestServ).toUpperCase();
		}
		return this;
	}
	//MANIPULAÇÃO DO ARRAY DE CARGA
	retornaUnidadeMedida(_codUniMed: Maybe): string {
		return lookup(
			{
				"00": "M3",
				"01": "KG",
				"02": "TON",
				"03": "UN",
				"04": "L",
				"05": "MMBTU",
			},
			_codUniMed,
		);
	}
	comCarga(_arrayCarga: Xml): this {
		if (Array.isArray(_arrayCarga) && _arrayCarga) {
			const cubagem = _arrayCarga.filter((carga) => {
				return carga.tpMed._text === "M3";
			});

			if (cubagem.length > 0) {
				this._cubagem = `${cubagem[0].qCarga._text} / ${this.retornaUnidadeMedida(cubagem[0].cUnid._text)}`;
			}

			const volume = _arrayCarga.filter((carga) => {
				return carga.tpMed._text === "VOLUMES";
			});

			if (volume.length > 0) {
				this._volume = `${volume[0].qCarga._text} / ${this.retornaUnidadeMedida(volume[0].cUnid._text)}`;
			}

			const _medidas = _arrayCarga.filter((carga) => {
				return !["M3", "VOLUMES"].includes(carga.tpMed._text);
			});

			if (_medidas.length > 0) {
				this._medidas = _medidas;
			}
		} else if (_arrayCarga) {
			switch (_arrayCarga.tpMed._text) {
				case "VOLUMES":
					this._volume = `${_arrayCarga.qCarga._text} ${this.retornaUnidadeMedida(_arrayCarga.cUnid._text)}`;
					break;
				case "M3":
					this._cubagem = `${_arrayCarga.qCarga._text} ${this.retornaUnidadeMedida(_arrayCarga.cUnid._text)}`;
					break;
				default:
					this._medidas = _arrayCarga;
			}
		}

		return this;
	}
	getMedidas(): Xml {
		return this._medidas;
	}
	getCubagem(): Maybe {
		return this._cubagem;
	}
	getVolume(): Maybe {
		return this._volume;
	}
	//TAG OBSERVAÇÃO
	comObservacao(_observacao: Maybe): this {
		this._observacao = _observacao;
		return this;
	}
	getObservacao(): Maybe {
		return this._observacao;
	}
	//RNTRC
	comRNTRC(_RNTRC: Maybe): this {
		this._RNTRC = _RNTRC;
		return this;
	}
	getRNTRC(): Maybe {
		return this._RNTRC;
	}
	//CIOT
	comCIOT(_CIOT: Maybe): this {
		this._CIOT = _CIOT;
		return this;
	}
	getCIOT(): Maybe {
		return this._CIOT;
	}
	//DATA DE ENTREGA
	comDataEntrega(_dataEntrega: Maybe): this {
		this._dataEntrega = _dataEntrega;
		return this;
	}
	getDataEntrega(): Maybe {
		return this._dataEntrega;
	}
	//COMPONENTE PRESTAÇÃO DE SERVIÇO
	comComponenteServico(_compServ: Xml): this {
		this._compServ = _compServ;
		return this;
	}
	getComponenteServico(): Xml {
		return this._compServ;
	}
	//Outras caracteristicas da carga
	comOutrasCaracCarga(_caracCarga: Maybe): this {
		this._caracCarga = _caracCarga;
		return this;
	}
	getCaracCarga(): Maybe {
		return this._caracCarga;
	}
	comDescServico(_comDescServico: Maybe): this {
		this._comDescServico = _comDescServico;
		return this;
	}
	getDescServico(): Maybe {
		return this._comDescServico;
	}
	comNumeroRegEstadual(_comNumEstadual: Maybe): this {
		this._comNumEstadual = _comNumEstadual;
		return this;
	}
	getNumeroRegEstadual(): Maybe {
		return this._comNumEstadual;
	}
	comPlaca(_comPlaca: Maybe): this {
		this._comPlaca = _comPlaca;
		return this;
	}
	getPlaca(): Maybe {
		return this._comPlaca;
	}
	comRenavam(_comRenavam: Maybe): this {
		this._comRenavam = _comRenavam;
		return this;
	}
	getRenavam(): Maybe {
		return this._comRenavam;
	}
	comUFveiculo(_comUF: Maybe): this {
		this._comUF = _comUF;
		return this;
	}
	getUFveiculo(): Maybe {
		return this._comUF;
	}
	// SEGURO DA CARGA
	comNomeSeg(_xSeg: Maybe): Maybe {
		this._xSeg = _xSeg;
		return this._xSeg;
	}
	getNomeSeg(): Maybe {
		return this._xSeg;
	}
	comRespSeg(_xResp: Maybe): Maybe {
		this._xResp = _xResp;
		return this._xResp;
	}
	getRespSeg(): Maybe {
		return this._xResp;
	}
	comApol(_nApol: Maybe): Maybe {
		this._nApol = _nApol;
		return this._nApol;
	}
	getApol(): Maybe {
		return this._nApol;
	}
	// Modal rodoviário
	getRodo(): Xml {
		return this._rodoTaf;
	}
	comRodo(_rodoTaf: Xml): Xml {
		this._rodoTaf = _rodoTaf;
		return this._rodoTaf;
	}
	// Carga OS
	getCargaOS(): Xml {
		return this._cargaOS;
	}
	comCargaOS(_cargaOS: Xml): Xml {
		this._cargaOS = _cargaOS;
		return this._cargaOS;
	}
}
