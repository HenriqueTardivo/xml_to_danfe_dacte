"use strict";

var CteInfo = (function () {
  function CteInfo() {}

  // TIPO CTE
  CteInfo.prototype.comTpCte = function (_tpCte) {
    this._tpCte = _tpCte;
    return this;
  };

  CteInfo.prototype.getCodTpCte = function () {
    return this._tpCte;
  };
  CteInfo.prototype.getTpCte = function () {
    return (
      {
        0: "Normal",
        1: "Complemento",
        2: "Anulação",
        3: "Substituto",
      }[this.getCodTpCte()] || ""
    );
  };
  // TIPO CTE

  //TIPO SERVIÇO
  CteInfo.prototype.comTpServ = function (_tpServ) {
    this._tpServ = _tpServ;
    return this;
  };

  CteInfo.prototype.getCodTpServ = function () {
    return this._tpServ;
  };

  CteInfo.prototype.getTpServ = function () {
    return (
      {
        0: "Normal",
        1: "Subcontratação",
        2: "Redespacho",
        3: "Redespacho Intermediário",
        4: "Multimodal",
      }[this.getCodTpServ()] || ""
    );
  };
  //TIPO SERVIÇO

  //TOMADOR DO SERVIÇO -- tag 'toma' no xml
  CteInfo.prototype.comToma = function (_toma) {
    this._toma = _toma;
    return this;
  };

  CteInfo.prototype.getCodToma = function () {
    return this._toma;
  };

  CteInfo.prototype.getToma = function () {
    return (
      {
        0: "Remetente",
        1: "Expeditor",
        2: "Recebedor",
        3: "Destinatario",
      }[this.getCodToma()] || ""
    );
  };
  //TOMADOR DO SERVIÇO -- tag 'toma' no xml

  //MODAL DE FRETE
  CteInfo.prototype.comModalFrete = function (_modalidadeDoFrete) {
    this._modalidadeDoFrete = _modalidadeDoFrete;
    return this;
  };

  CteInfo.prototype.getModalCodFrete = function () {
    return this._modalidadeDoFrete;
  };

  CteInfo.prototype.getModalFrete = function () {
    return (
      {
        "01": "Rodoviario",
        "02": "Aéreo",
        "03": "Aquaviário",
        "04": "Ferroviário",
        "05": "Dutoviário",
        "06": "Multimodal",
      }[this.getModalCodFrete()] || ""
    );
  };
  //MODAL DE FRETE

  //CFOP FRETE
  CteInfo.prototype.comCfopFrete = function (_cfopFrete) {
    this._cfopFrete = _cfopFrete;
    return this;
  };

  CteInfo.prototype.getCfopFrete = function () {
    return this._cfopFrete;
  };
  //CFOP FRETE

  //INICIO DA PRESTAÇÃO -- Enviar concatenado municipio e uf
  CteInfo.prototype.comInicioPrestacao = function (_inicioPrestacao) {
    this._inicioPrestacao = _inicioPrestacao;
    return this;
  };

  CteInfo.prototype.getInicioPrestacao = function () {
    return this._inicioPrestacao;
  };
  //INICIO DA PRESTAÇÃO

  // FINAL DA PRESTAÇÃO -- Enviar concatenado municipio e uf
  CteInfo.prototype.comFinalDaPrestacao = function (_finalPrestacao) {
    this._finalPrestacao = _finalPrestacao;
    return this;
  };

  CteInfo.prototype.getFinalDaPrestacao = function () {
    return this._finalPrestacao;
  };
  // FINAL DA PRESTAÇÃO

  //MODELO
  CteInfo.prototype.comModelo = function (_modelo) {
    this._modelo = _modelo;
    return this;
  };

  CteInfo.prototype.getModelo = function () {
    return this._modelo;
  };
  //MODELO

  //PRODUTO PREDOMINANTE
  CteInfo.prototype.comProdPred = function (_prodPred) {
    if (_prodPred) {
      this._prodPred = String(_prodPred).toUpperCase();
    }
    return this;
  };

  CteInfo.prototype.getProdPred = function () {
    return this._prodPred;
  };
  //PRODUTO PREDOMINANTE

  //MANIPULAÇÃO DO ARRAY DE CARGA
  CteInfo.prototype.retornaUnidadeMedida = function (_codUniMed) {
    return (
      {
        "00": "M3",
        "01": "KG",
        "02": "TON",
        "03": "UN",
        "04": "L",
        "05": "MMBTU",
      }[_codUniMed] || ""
    );
  };

  CteInfo.prototype.comCarga = function (_arrayCarga) {
    if (Array.isArray(_arrayCarga) && _arrayCarga) {
      let cubagem = _arrayCarga.filter((carga) => {
        return carga.tpMed._text === "M3";
      });

      if (cubagem.length > 0) {
        this._cubagem =
          cubagem[0].qCarga._text +
          " / " +
          this.retornaUnidadeMedida(cubagem[0].cUnid._text);
      }

      let volume = _arrayCarga.filter((carga) => {
        return carga.tpMed._text === "VOLUMES";
      });

      if (volume.length > 0) {
        this._volume =
          volume[0].qCarga._text +
          " / " +
          this.retornaUnidadeMedida(volume[0].cUnid._text);
      }

      let _medidas = _arrayCarga.filter((carga) => {
        return !["M3", "VOLUMES"].includes(carga.tpMed._text);
      });

      if (_medidas.length > 0) {
        this._medidas = _medidas;
      }
    } else if (_arrayCarga) {
      switch (_arrayCarga.tpMed._text) {
        case "VOLUMES":
          this._volume =
            _arrayCarga.qCarga._text +
            " " +
            this.retornaUnidadeMedida(_arrayCarga.cUnid._text);
          break;
        case "M3":
          this._cubagem =
            _arrayCarga.qCarga._text +
            " " +
            this.retornaUnidadeMedida(_arrayCarga.cUnid._text);
          break;
        default:
          this._medidas = _arrayCarga;
      }
    }

    return this;
  };

  CteInfo.prototype.getMedidas = function () {
    return this._medidas;
  };

  CteInfo.prototype.getCubagem = function () {
    return this._cubagem;
  };

  CteInfo.prototype.getVolume = function () {
    return this._volume;
  };
  //MANIPULAÇÃO DO ARRAY DE CARGA

  //TAG OBSERVAÇÃO
  CteInfo.prototype.comObservacao = function (_observacao) {
    this._observacao = _observacao;
    return this;
  };

  CteInfo.prototype.getObservacao = function () {
    return this._observacao;
  };
  //TAG OBSERVAÇÃO

  //DADOS MODAL RODOVIÁROP
  //RNTRC
  CteInfo.prototype.comRNTRC = function (_RNTRC) {
    this._RNTRC = _RNTRC;
    return this;
  };

  CteInfo.prototype.getRNTRC = function () {
    return this._RNTRC;
  };
  //RNTRC

  //CIOT
  CteInfo.prototype.comCIOT = function (_CIOT) {
    this._CIOT = _CIOT;
    return this;
  };

  CteInfo.prototype.getCIOT = function () {
    return this._CIOT;
  };
  //CIOT

  //DATA DE ENTREGA
  CteInfo.prototype.comDataEntrega = function (_dataEntrega) {
    this._dataEntrega = _dataEntrega;
    return this;
  };

  CteInfo.prototype.getDataEntrega = function () {
    return this._dataEntrega;
  };
  //DATA DE ENTREGA

  //COMPONENTE PRESTAÇÃO DE SERVIÇO
  CteInfo.prototype.comComponenteServico = function (_compServ) {
    this._compServ = _compServ;
    return this;
  };

  CteInfo.prototype.getComponenteServico = function () {
    return this._compServ;
  };
  //COMPONENTE PRESTAÇÃO DE SERVIÇO

  //Outras caracteristicas da carga
  CteInfo.prototype.comOutrasCaracCarga = function (_caracCarga) {
    this._caracCarga = _caracCarga;
    return this;
  };

  CteInfo.prototype.getCaracCarga = function () {
    return this._caracCarga;
  };
  //Outras caracteristicas da carga

  return CteInfo;
})();

module.exports = CteInfo;
