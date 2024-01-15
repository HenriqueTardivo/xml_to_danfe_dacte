"use strict";

// CLASSES CRIADAS PARA O CTE
const CteInfo = require("./cteInfo");
const Expeditor = require("./expeditor");
const Recebedor = require("./recebedor");
// CLASSES CRIADAS PARA O CTE

var gammautils = require("../../gammautils/index"),
    eDataValida = gammautils.date.isValidDate,
    ie = require("inscricaoestadual"),
    Impostos = require("./impostos"),
    Emitente = require("./emitente"),
    Destinatario = require("./destinatario"),
    Protocolo = require("./protocolo"),
    Transportador = require("./transportador"),
    Volumes = require("./volumes");

var Danfe = (function () {
    function Danfe() {
        this.comOrientacao("retrato");
        this.comEmitente(new Emitente());
        this.comDestinatario(new Destinatario());
        this.comTransportador(new Transportador());
        this.comProtocolo(new Protocolo());
        this.comImpostos(new Impostos());
        this.comVolumes(new Volumes());
        this.comExpeditor(new Expeditor());
        this.comRecebedor(new Recebedor());
        this.comCteInfo(new CteInfo());
        this._itens = [];
    }

    Danfe.prototype.getProtocolo = function () {
        return this._protocolo;
    };

    Danfe.prototype.comProtocolo = function (_protocolo) {
        this._protocolo = _protocolo;
        return this;
    };

    Danfe.prototype.getFormularioDeSeguranca = function () {
        return this._formularioDeSeguranca;
    };

    Danfe.prototype.comFormularioDeSeguranca = function (
        _formularioDeSeguranca
    ) {
        // if(_formularioDeSeguranca.getJustificativa().length < 15) {
        //     throw new Error([
        //         'A justificativa da entrada em contingência deve conter 15 caracteres ou mais'
        //     ].join(''));
        // }

        _formularioDeSeguranca.comDanfe(this);
        this._formularioDeSeguranca = _formularioDeSeguranca;

        return this;
    };

    Danfe.prototype.getEmitente = function () {
        return this._emitente;
    };

    Danfe.prototype.comExpeditor = function (_expeditor) {
        this._expeditor = _expeditor;
        return this;
    };

    Danfe.prototype.comRecebedor = function (_recebedor) {
        this._recebedor = _recebedor;
        return this;
    };

    Danfe.prototype.getExpeditor = function () {
        return this._expeditor;
    };

    Danfe.prototype.getRecebedor = function () {
        return this._recebedor;
    };

    Danfe.prototype.comEmitente = function (_emitente) {
        this._emitente = _emitente;
        return this;
    };

    Danfe.prototype.getDestinatario = function () {
        return this._destinatario;
    };

    Danfe.prototype.comDestinatario = function (_destinatario) {
        this._destinatario = _destinatario;
        return this;
    };

    Danfe.prototype.getTransportador = function () {
        return this._transportador;
    };

    Danfe.prototype.comTransportador = function (_transportador) {
        this._transportador = _transportador;
        return this;
    };

    Danfe.prototype.getImpostos = function () {
        return this._impostos;
    };

    Danfe.prototype.comImpostos = function (_impostos) {
        this._impostos = _impostos;
        return this;
    };

    Danfe.prototype.adicionarItem = function (_item) {
        this._itens.push(_item);
        return this;
    };

    Danfe.prototype.getFatura = function () {
        return this._fatura;
    };

    Danfe.prototype.comFatura = function (_fatura) {
        this._fatura = _fatura;
        return this;
    };

    Danfe.prototype.getDuplicatas = function () {
        return this._duplicatas || [];
    };

    Danfe.prototype.comDuplicatas = function (_duplicatas) {
        this._duplicatas = _duplicatas;
        return this;
    };

    Danfe.prototype.adicionarDuplicata = function (duplicata) {
        if (!this._duplicatas) {
            this._duplicatas = [];
        }

        this._duplicatas.push(duplicata);
        return this;
    };

    Danfe.prototype.getItens = function () {
        return this._itens;
    };

    Danfe.prototype.comItens = function (_itens) {
        this._itens = _itens;
        return this;
    };

    Danfe.prototype.getInformacoesComplementares = function () {
        return this._informacoesComplementares || "";
    };

    Danfe.prototype.comInformacoesComplementares = function (
        _informacoesComplementares
    ) {
        if (!_informacoesComplementares) {
            return this;
        }

        this._informacoesComplementares = _informacoesComplementares.toString();
        return this;
    };

    Danfe.prototype.getValorTotalDaNota = function () {
        return this._valorTotalDaNota || 0;
    };

    Danfe.prototype.getValorTotalDaNotaFormatado = function (simbolo) {
        return this.getValorTotalDaNota();
    };

    Danfe.prototype.comValorTotalDaNota = function (_valorTotalDaNota) {
        this._valorTotalDaNota = _valorTotalDaNota;
        return this;
    };

    Danfe.prototype.getValorTotalDosProdutos = function () {
        return this._valorTotalDosProdutos || 0;
    };

    Danfe.prototype.getValorTotalDosProdutosFormatado = function () {
        return this.getValorTotalDosProdutos();
    };

    Danfe.prototype.comValorTotalDosProdutos = function (
        _valorTotalDosProdutos
    ) {
        this._valorTotalDosProdutos = _valorTotalDosProdutos;
        return this;
    };

    Danfe.prototype.getValorTotalDosServicos = function () {
        return this._valorTotalDosServicos || 0;
    };

    Danfe.prototype.getValorTotalDosServicosFormatado = function () {
        return this.getValorTotalDosServicos();
    };

    Danfe.prototype.comValorTotalDosServicos = function (
        _valorTotalDosServicos
    ) {
        this._valorTotalDosServicos = _valorTotalDosServicos;
        return this;
    };

    Danfe.prototype.getOrientacao = function () {
        return this._orientacao;
    };

    Danfe.prototype.comOrientacao = function (_orientacao) {
        if (["retrato", "paisagem"].indexOf(_orientacao) === -1) {
            throw new Error(
                'Os valores permitidos são as strings "retrato" e "paisagem"'
            );
        }

        this._orientacao = _orientacao;

        return this;
    };

    Danfe.prototype.getInscricaoEstadualDoSubstitutoTributario = function () {
        return this._inscricaoEstadualDoSubstitutoTributario || "";
    };

    Danfe.prototype.comInscricaoEstadualDoSubstitutoTributario = function (
        _inscricaoEstadualDoSubstitutoTributario
    ) {
        // if(!ie(_inscricaoEstadualDoSubstitutoTributario)) {
        //     // throw new Error('Não é uma inscrição estadual válida');
        // }

        return this._inscricaoEstadualDoSubstitutoTributario;
    };

    Danfe.prototype.getValorDoFrete = function () {
        return this._valorDoFrete || 0;
    };

    Danfe.prototype.getValorDoFreteFormatado = function () {
        return this.getValorDoFrete();
    };

    Danfe.prototype.comValorDoFrete = function (_valorDoFrete) {
        this._valorDoFrete = _valorDoFrete;
        return this;
    };

    Danfe.prototype.getValorDoSeguro = function () {
        return this._valorDoSeguro || 0;
    };

    Danfe.prototype.getValorDoSeguroFormatado = function () {
        return this.getValorDoSeguro();
    };

    Danfe.prototype.comValorDoSeguro = function (_valorDoSeguro) {
        this._valorDoSeguro = _valorDoSeguro;
        return this;
    };

    Danfe.prototype.getDesconto = function () {
        return this._desconto || 0;
    };

    Danfe.prototype.getDescontoFormatado = function () {
        return this.getDesconto();
    };

    Danfe.prototype.comDesconto = function (_desconto) {
        this._desconto = _desconto;
        return this;
    };

    Danfe.prototype.getOutrasDespesas = function () {
        return this._outrasDespesas || 0;
    };

    Danfe.prototype.getOutrasDespesasFormatado = function () {
        return this.getOutrasDespesas();
    };

    Danfe.prototype.comOutrasDespesas = function (_outrasDespesas) {
        this._outrasDespesas = _outrasDespesas;
        return this;
    };

    Danfe.prototype.getTipo = function () {
        return this._tipo;
    };

    Danfe.prototype.getTipoFormatado = function () {
        return this.getTipo();
    };

    Danfe.prototype.comTipo = function (_tipo) {
        this._tipo = _tipo;

        return this;
    };

    Danfe.prototype.getNumero = function () {
        return this._numero;
    };

    Danfe.prototype.getNumeroFormatado = function () {
        // if(this.getNumero()) {
        // }
        return "Nº. " + this.getNumero();
    };

    Danfe.prototype.comNumero = function (_numero) {
        _numero = parseInt(_numero, 10);

        if (isNaN(_numero)) {
            throw new Error(
                "Não é um número válido. Valor encontrado: " + _numero
            );
        }

        if (_numero < 1 || _numero > 999999999) {
            throw new Error("O número deve ser um valor entre 1 e 999.999.999");
        }

        this._numero = _numero;

        return this;
    };

    Danfe.prototype.getSerie = function () {
        return this._serie;
    };

    Danfe.prototype.getSerieFormatada = function () {
        // if(this.getSerie()) {
        // }
        return "SÉRIE " + this.getSerie();
    };

    Danfe.prototype.comSerie = function (_serie) {
        this._serie = _serie;

        return this;
    };

    Danfe.prototype.getChaveDeAcesso = function () {
        return this._chaveDeAcesso || "";
    };

    Danfe.prototype.getChaveDeAcessoFormatada = function () {
        return this.getChaveDeAcesso();
    };

    Danfe.prototype.comChaveDeAcesso = function (_chaveDeAcesso) {
        // if(!eChaveDeAcesso(_chaveDeAcesso)) {
        //     throw new Error('A chave de acesso é inválida');
        // }

        this._chaveDeAcesso = _chaveDeAcesso;

        return this._chaveDeAcesso;
    };

    Danfe.prototype.getDataDaEmissao = function () {
        return this._dataDaEmissao;
    };

    Danfe.prototype.getDataDaEmissaoFormatada = function () {
        if (this.getDataDaEmissao()) {
            return this.getDataDaEmissao();
        }

        return "";
    };

    Danfe.prototype.comDataDaEmissao = function (_dataDaEmissao) {
        // if(typeof _dataDaEmissao === 'string') {
        //     _dataDaEmissao = new Date(_dataDaEmissao);
        // }

        // if(!eDataValida(_dataDaEmissao)) {
        //     throw new Error('Não é uma data válida');
        // }

        this._dataDaEmissao = _dataDaEmissao;

        return this;
    };

    Danfe.prototype.getDataDaEntradaOuSaida = function () {
        return this._dataDaEntradaOuSaida;
    };

    Danfe.prototype.getDataDaEntradaOuSaidaFormatada = function () {
        if (this.getDataDaEntradaOuSaida()) {
            return this.getDataDaEntradaOuSaida();
        }

        return "";
    };

    // htardivo
    Danfe.prototype.getHorarioDaEntradaOuSaida = function () {
        return this._horarioEntradaSaida || "";
    };

    Danfe.prototype.comHorarioEntradaSaida = function (_horarioEntradaSaida) {
        this._horarioEntradaSaida = _horarioEntradaSaida;
        return this;
    };
    // htardivo

    Danfe.prototype.comDataDaEntradaOuSaida = function (_dataDaEntradaOuSaida) {
        // if(typeof _dataDaEntradaOuSaida === 'string') {
        //     _dataDaEntradaOuSaida = new Date(_dataDaEntradaOuSaida);
        // }

        // if(!eDataValida(_dataDaEntradaOuSaida)) {
        //     throw new Error('Não é uma data válida');
        // }

        this._dataDaEntradaOuSaida = _dataDaEntradaOuSaida;

        return this;
    };

    Danfe.prototype.getVolumes = function () {
        return this._volumes;
    };

    Danfe.prototype.comVolumes = function (_volumes) {
        this._volumes = _volumes;
        return this;
    };

    Danfe.prototype.getModalidadeDoFrete = function () {
        return this._modalidadeDoFrete;
    };

    Danfe.prototype.comModalidadeDoFrete = function (_modalidadeDoFrete) {
        // if([
        //     'semFrete',
        //     'porContaDoEmitente',
        //     'porContaDoDestinatarioRemetente',
        //     'porContaDeTerceiros'
        // ].indexOf(_modalidadeDoFrete) === -1) {
        //     throw new Error([
        //         'Os valores permitidos são as strings',
        //         '"semFrete",',
        //         '"porContaDoEmitente",',
        //         '"porContaDoDestinatarioRemetente",',
        //         '"porContaDeTerceiros"',
        //     ].join(' '));
        // }
        this._modalidadeDoFrete = _modalidadeDoFrete;

        return this;
    };

    Danfe.prototype.getModalidadeDoFreteFormatada = function () {
        return (
            {
                9: "(9) Sem Frete",
                0: "(0) Emitente",
                1: "(1) Dest/Rem",
                2: "(2) Terceiros",
                3: "(3) T.Próp Rem",
                4: "(4) T.Próp Dest",
            }[this.getModalidadeDoFrete()] || ""
        );
    };

    Danfe.prototype.getNaturezaDaOperacao = function () {
        return this._naturezaDaOperacao || "";
    };

    Danfe.prototype.comNaturezaDaOperacao = function (_naturezaDaOperacao) {
        this._naturezaDaOperacao = _naturezaDaOperacao;
        return this;
    };

    // MÓDULOS CRIADOS PRA CAMPOS DACTE
    Danfe.prototype.comCteInfo = function (_cteInfo) {
        this._cteInfo = _cteInfo;
        return this;
    };

    Danfe.prototype.getCteInfo = function () {
        return this._cteInfo;
    };
    // MÓDULOS CRIADOS PRA CAMPOS DACTE

    return Danfe;
})();

module.exports = Danfe;
