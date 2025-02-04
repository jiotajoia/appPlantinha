export class Planta {
    props;
    constructor(props) {
        this.props = props;
    }
    static create(nome, nomeCientifico, imagem, descricao, nivelDeCuidado, usoMedico, luminosidade) {
        return new Planta({
            id: crypto.randomUUID.toString(),
            nome,
            nomeCientifico,
            imagem,
            descricao,
            nivelDeCuidado,
            usoMedico,
            luminosidade
        });
    }
    static with(props) {
        return new Planta(props);
    }
    get id() {
        return this.props.id;
    }
    get nome() {
        return this.props.nome;
    }
    get nomeCientifico() {
        return this.props.nomeCientifico;
    }
    get imagem() {
        return this.props.imagem;
    }
    get descricao() {
        return this.props.descricao;
    }
    get nivelDeCuidado() {
        return this.props.nivelDeCuidado;
    }
    get usoMedico() {
        return this.props.usoMedico;
    }
    get luminosidade() {
        return this.props.luminosidade;
    }
}
