export class ResultadoBusca {
    props;
    constructor(props) {
        this.props = props;
    }
    static create(tipoBusca, plantas) {
        return new ResultadoBusca({
            id: crypto.randomUUID.toString(), //perigo: existe a pequena chance de gerar uuid iguais, n é feita a verificação
            dataBusca: new Date().toISOString().split('T')[0],
            tipoBusca,
            plantas: plantas
        });
    }
    static with(props) {
        return new ResultadoBusca(props);
    }
    get id() {
        return this.props.id;
    }
    get dataBusca() {
        return this.props.dataBusca;
    }
    get tipoBusca() {
        return this.props.tipoBusca;
    }
    get plantas() {
        return this.props.plantas;
    }
}
