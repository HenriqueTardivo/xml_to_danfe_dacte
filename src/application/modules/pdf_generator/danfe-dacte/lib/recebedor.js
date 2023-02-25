"use strict";

var util = require("util"),
    Destinatario = require("./destinatario");

var Recebedor = (function () {
    function Recebedor() {
        Destinatario.apply(this, arguments);
    }

    util.inherits(Recebedor, Destinatario);

    return Recebedor;
})();

module.exports = Recebedor;
