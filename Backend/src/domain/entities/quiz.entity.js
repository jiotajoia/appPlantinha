"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Quiz = void 0;
var Quiz = /** @class */ (function () {
    function Quiz(props) {
        this.props = props;
    }
    Quiz.create = function (resultado) {
        return new Quiz({
            id: crypto.randomUUID().toString(),
            perguntas: [],
            resultado: resultado
        });
    };
    Quiz.with = function (props) {
        return new Quiz(props);
    };
    Object.defineProperty(Quiz.prototype, "id", {
        get: function () {
            return this.props.id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Quiz.prototype, "perguntas", {
        get: function () {
            return this.props.perguntas;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Quiz.prototype, "resultado", {
        get: function () {
            return this.props.resultado;
        },
        enumerable: false,
        configurable: true
    });
    return Quiz;
}());
exports.Quiz = Quiz;
