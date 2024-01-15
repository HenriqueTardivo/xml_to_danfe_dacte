"use strict";

var util = require("util"),
    Emitente = require("./emitente");

var Expeditor = (function () {
    function Expeditor() {
        Emitente.apply(this, arguments);
    }

    util.inherits(Expeditor, Emitente);

    return Expeditor;
})();

module.exports = Expeditor;
