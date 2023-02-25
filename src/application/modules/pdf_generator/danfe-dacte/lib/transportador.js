'use strict';

// var brasil = require('brasil'),
//     ePlaca = brasil.validacoes.ePlaca,
//     formatarPlaca = brasil.formatacoes.placa,
//     siglasDosEstados = brasil.dados.siglasDosEstados,
var
    util = require('util'),
    Pessoa = require('./pessoa');

var Transportador = (function() {
    function Transportador() {
        Pessoa.apply(this, arguments);
    }

    util.inherits(Transportador, Pessoa);

    Transportador.prototype.getCodigoAntt = function() {
        return this._codigoAntt || '';
    };

    Transportador.prototype.comCodigoAntt = function(_codigoAntt) {
        if(_codigoAntt) {
            this._codigoAntt = _codigoAntt
        }

        return this;
    };

    Transportador.prototype.getPlacaDoVeiculoFormatada = function() {
        return (this.getPlacaDoVeiculo());
    };

    Transportador.prototype.getPlacaDoVeiculo = function() {
        return this._placaDoVeiculo || '';
    };

    Transportador.prototype.comPlacaDoVeiculo = function(_placaDoVeiculo) {
        // if(!ePlaca(_placaDoVeiculo)) {
        //     throw new Error('Não é uma placa válida');
        // }

       
        return  this._placaDoVeiculo
    };

    Transportador.prototype.getUfDaPlacaDoVeiculo = function() {
        return this._ufDaPlacaDoVeiculo || '';
    };

    Transportador.prototype.comUfDaPlacaDoVeiculo = function(_ufDaPlacaDoVeiculo) {
        

        // if(siglasDosEstados.indexOf(_ufDaPlacaDoVeiculo) === -1) {
        //     throw new Error('Não é um estado válido');
        // }

        
        return  this._ufDaPlacaDoVeiculo
    };

    return Transportador;
})();


module.exports = Transportador;
