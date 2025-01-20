"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pergunta = void 0;
var Pergunta = /** @class */ (function () {
    function Pergunta(props) {
        this.props = props;
    }
    Pergunta.create = function (indagacao) {
        return new Pergunta({
            id: crypto.randomUUID.toString(),
            indagacao: indagacao,
            opcoes: []
        });
    };
    Pergunta.prototype.with = function (props) {
        return new Pergunta(props);
    };
    Object.defineProperty(Pergunta.prototype, "id", {
        get: function () {
            return this.props.id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Pergunta.prototype, "indagacao", {
        get: function () {
            return this.props.indagacao;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Pergunta.prototype, "opcoes", {
        get: function () {
            return this.props.opcoes;
        },
        enumerable: false,
        configurable: true
    });
    return Pergunta;
}());
exports.Pergunta = Pergunta;
