export class Historico {
    props;
    constructor(props) {
        this.props = props;
    }
    static create() {
        return new Historico({
            buscas: []
        });
    }
    get buscas() {
        return this.props.buscas;
    }
}
