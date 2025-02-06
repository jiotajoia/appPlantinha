"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Planta = void 0;
var Planta = /** @class */ (function () {
    function Planta(props) {
        this.props = props;
    }
    Planta.create = function (nome, nomeCientifico, imagem, descricao, nivelDeCuidado, usoMedico, luminosidade) {
        return new Planta({
            id: crypto.randomUUID.toString(),
            nome: nome,
            nomeCientifico: nomeCientifico,
            imagem: imagem,
            descricao: descricao,
            nivelDeCuidado: nivelDeCuidado,
            usoMedico: usoMedico,
            luminosidade: luminosidade
        });
    };
    Planta.with = function (props) {
        return new Planta(props);
    };
    Object.defineProperty(Planta.prototype, "id", {
        get: function () {
            return this.props.id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Planta.prototype, "nome", {
        get: function () {
            return this.props.nome;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Planta.prototype, "nomeCientifico", {
        get: function () {
            return this.props.nomeCientifico;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Planta.prototype, "imagem", {
        get: function () {
            return this.props.imagem;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Planta.prototype, "descricao", {
        get: function () {
            return this.props.descricao;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Planta.prototype, "nivelDeCuidado", {
        get: function () {
            return this.props.nivelDeCuidado;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Planta.prototype, "usoMedico", {
        get: function () {
            return this.props.usoMedico;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Planta.prototype, "luminosidade", {
        get: function () {
            return this.props.luminosidade;
        },
        enumerable: false,
        configurable: true
    });
    return Planta;
}());
exports.Planta = Planta;
