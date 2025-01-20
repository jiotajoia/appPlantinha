"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResultadoBusca = void 0;
var ResultadoBusca = /** @class */ (function () {
    function ResultadoBusca(props) {
        this.props = props;
    }
    ResultadoBusca.create = function (dataBusca, tipoBusca, plantas) {
        return new ResultadoBusca({
            id: crypto.randomUUID.toString(),
            dataBusca: dataBusca,
            tipoBusca: tipoBusca,
            plantas: []
        });
    };
    ResultadoBusca.with = function (props) {
        return new ResultadoBusca(props);
    };
    Object.defineProperty(ResultadoBusca.prototype, "id", {
        get: function () {
            return this.props.id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ResultadoBusca.prototype, "dataBusca", {
        get: function () {
            return this.props.dataBusca;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ResultadoBusca.prototype, "tipoBusca", {
        get: function () {
            return this.props.tipoBusca;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ResultadoBusca.prototype, "plantas", {
        get: function () {
            return this.props.plantas;
        },
        enumerable: false,
        configurable: true
    });
    return ResultadoBusca;
}());
exports.ResultadoBusca = ResultadoBusca;
