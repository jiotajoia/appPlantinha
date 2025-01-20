"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Historico = void 0;
var Historico = /** @class */ (function () {
    function Historico(props) {
        this.props = props;
    }
    Historico.create = function () {
        return new Historico({
            buscas: []
        });
    };
    Object.defineProperty(Historico.prototype, "buscas", {
        get: function () {
            return this.props.buscas;
        },
        enumerable: false,
        configurable: true
    });
    return Historico;
}());
exports.Historico = Historico;
