export class ResultadoBusca {
    props;
    constructor(props) {
        this.props = props;
    }
    static create(dataBusca, tipoBusca) {
        return new ResultadoBusca({
            id: crypto.randomUUID.toString(),
            dataBusca,
            tipoBusca,
            plantas: []
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
