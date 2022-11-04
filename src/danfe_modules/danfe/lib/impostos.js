"use strict";

// var brasil = require('brasil'),
//     formatarDinheiro = brasil.formatacoes.dinheiro;

var Impostos = (function () {
    function Impostos() {}

    Impostos.prototype.getBaseDeCalculoDoIcms = function () {
        return this._baseDeCalculoDoIcms || 0;
    };

    Impostos.prototype.getBaseDeCalculoDoIcmsFormatada = function () {
        return this.getBaseDeCalculoDoIcms();
    };

    Impostos.prototype.comBaseDeCalculoDoIcms = function (
        _baseDeCalculoDoIcms
    ) {
        this._baseDeCalculoDoIcms = _baseDeCalculoDoIcms;
        return this;
    };

    Impostos.prototype.getValorDoIcms = function () {
        return this._valorDoIcms || 0;
    };

    Impostos.prototype.getValorDoIcmsFormatado = function () {
        return (
            this.getValorDoIcms(),
            {
                simbolo: "",
            }
        );
    };

    Impostos.prototype.comValorDoIcms = function (_valorDoIcms) {
        this._valorDoIcms = _valorDoIcms;
        return this;
    };

    Impostos.prototype.getBaseDeCalculoDoIcmsSt = function () {
        return this._baseDeCalculoDoIcmsSt || 0;
    };

    Impostos.prototype.getBaseDeCalculoDoIcmsStFormatada = function () {
        return (
            this.getBaseDeCalculoDoIcmsSt(),
            {
                simbolo: "",
            }
        );
    };

    Impostos.prototype.comBaseDeCalculoDoIcmsSt = function (
        _baseDeCalculoDoIcmsSt
    ) {
        this._baseDeCalculoDoIcmsSt = _baseDeCalculoDoIcmsSt;
        return this;
    };

    Impostos.prototype.getValorDoIcmsSt = function () {
        return this._ValorDoIcmsSt || 0;
    };

    Impostos.prototype.getValorDoIcmsStFormatado = function () {
        return (
            this.getValorDoIcmsSt(),
            {
                simbolo: "",
            }
        );
    };

    Impostos.prototype.comValorDoIcmsSt = function (_ValorDoIcmsSt) {
        this._ValorDoIcmsSt = _ValorDoIcmsSt;
        return this;
    };

    Impostos.prototype.getValorDoImpostoDeImportacao = function () {
        return this._valorDoImpostoDeImportacao || 0;
    };

    Impostos.prototype.getValorDoImpostoDeImportacaoFormatado = function () {
        return (
            this.getValorDoImpostoDeImportacao(),
            {
                simbolo: "",
            }
        );
    };

    Impostos.prototype.comValorDoImpostoDeImportacao = function (
        _valorDoImpostoDeImportacao
    ) {
        this._valorDoImpostoDeImportacao = _valorDoImpostoDeImportacao;
        return this;
    };

    Impostos.prototype.getValorDoPis = function () {
        return this._valorDoPis || 0;
    };

    Impostos.prototype.getValorDoPisFormatado = function () {
        return (
            this.getValorDoPis(),
            {
                simbolo: "",
            }
        );
    };

    Impostos.prototype.comValorDoPis = function (_valorDoPis) {
        this._valorDoPis = _valorDoPis;
        return this;
    };

    Impostos.prototype.getValorTotalDoIpi = function () {
        return this._valorTotalDoIpi || 0;
    };

    Impostos.prototype.getValorTotalDoIpiFormatado = function () {
        return (
            this.getValorTotalDoIpi(),
            {
                simbolo: "",
            }
        );
    };

    Impostos.prototype.comValorTotalDoIpi = function (_valorTotalDoIpi) {
        this._valorTotalDoIpi = _valorTotalDoIpi;
        return this;
    };

    Impostos.prototype.getValorDaCofins = function () {
        return this._valorDaCofins || 0;
    };

    Impostos.prototype.getValorDaCofinsFormatado = function () {
        return (
            this.getValorDaCofins(),
            {
                simbolo: "",
            }
        );
    };

    Impostos.prototype.comValorDaCofins = function (_valorDaCofins) {
        this._valorDaCofins = _valorDaCofins;
        return this;
    };

    Impostos.prototype.getBaseDeCalculoDoIssqn = function () {
        return this._baseDeCalculoDoIssqn || 0;
    };

    Impostos.prototype.getBaseDeCalculoDoIssqnFormatada = function () {
        return (
            this.getBaseDeCalculoDoIssqn(),
            {
                simbolo: "",
            }
        );
    };

    Impostos.prototype.comBaseDeCalculoDoIssqn = function (
        _baseDeCalculoDoIssqn
    ) {
        this._baseDeCalculoDoIssqn = _baseDeCalculoDoIssqn;
        return this;
    };

    Impostos.prototype.getValorTotalDoIssqn = function () {
        return this._valorTotalDoIssqn || 0;
    };

    Impostos.prototype.getValorTotalDoIssqnFormatado = function () {
        return (
            this.getValorTotalDoIssqn(),
            {
                simbolo: "",
            }
        );
    };

    Impostos.prototype.comValorTotalDoIssqn = function (_valorTotalDoIssqn) {
        this._valorTotalDoIssqn = _valorTotalDoIssqn;
        return this;
    };

    Impostos.prototype.comValorICMSufDest = function (_valorICMSufDest) {
        this._valorICMSufDest = _valorICMSufDest;
    };

    Impostos.prototype.getValorICMSufDest = function () {
        return this._valorICMSufDest;
    };

    Impostos.prototype.comValorICMSufRemet = function (_valorICMSufRemet) {
        this._valorICMSufRemet = _valorICMSufRemet;
        return this;
    };

    Impostos.prototype.getValorICMSufRemet = function () {
        return this._valorICMSufRemet;
    };

    Impostos.prototype.comValorFCP = function (_valorFCP) {
        this._valorFCP = _valorFCP;
        return this;
    };

    Impostos.prototype.getValorFCP = function () {
        return this._valorFCP;
    };

    Impostos.prototype.getValorTotTrib = function () {
        return this._valorTotTrib;
    };
    Impostos.prototype.comValorTotTrib = function (_valorTotTrib) {
        this._valorTotTrib = _valorTotTrib;
        return this;
    };

    return Impostos;
})();

module.exports = Impostos;
