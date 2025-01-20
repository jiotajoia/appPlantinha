"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
var Usuario = /** @class */ (function () {
    function Usuario(props) {
        this.props = props;
    }
    Usuario.create = function (nome, email, senha) {
        return new Usuario({
            id: crypto.randomUUID().toString(),
            nome: nome,
            email: email,
            senha: senha,
            historico: []
        });
    };
    Usuario.with = function (props) {
        return new Usuario(props);
    };
    Object.defineProperty(Usuario.prototype, "id", {
        get: function () {
            return this.props.id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Usuario.prototype, "nome", {
        get: function () {
            return this.props.nome;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Usuario.prototype, "email", {
        get: function () {
            return this.props.email;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Usuario.prototype, "senha", {
        get: function () {
            return this.props.senha;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Usuario.prototype, "historico", {
        get: function () {
            return this.props.historico;
        },
        enumerable: false,
        configurable: true
    });
    return Usuario;
}());
exports.Usuario = Usuario;
