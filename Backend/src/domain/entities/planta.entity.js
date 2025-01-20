"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Planta = void 0;
var Planta = /** @class */ (function () {
    function Planta(props) {
        this.props = props;
    }
    Planta.create = function (nome, nomeCientifico, imagem, cuidados, curiosidades, ambiente, shadowOrLightType) {
        return new Planta({
            id: crypto.randomUUID.toString(),
            nome: nome,
            nomeCientifico: nomeCientifico,
            imagem: imagem,
            cuidados: cuidados,
            curiosidades: curiosidades,
            ambiente: ambiente,
            shadowOrLightType: shadowOrLightType
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
    Object.defineProperty(Planta.prototype, "cuidados", {
        get: function () {
            return this.props.cuidados;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Planta.prototype, "curiosidades", {
        get: function () {
            return this.props.curiosidades;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Planta.prototype, "ambiente", {
        get: function () {
            return this.props.ambiente;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Planta.prototype, "shadowOrLightType", {
        get: function () {
            return this.props.shadowOrLightType;
        },
        enumerable: false,
        configurable: true
    });
    return Planta;
}());
exports.Planta = Planta;
