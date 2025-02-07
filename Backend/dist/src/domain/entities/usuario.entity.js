export class Usuario {
    props;
    constructor(props) {
        this.props = props;
    }
    static create(nome, email, senha) {
        return new Usuario({
            id: crypto.randomUUID().toString(),
            nome,
            email,
            senha,
            historico: []
        });
    }
    static with(props) {
        return new Usuario(props);
    }
    get id() {
        return this.props.id;
    }
    get nome() {
        return this.props.nome;
    }
    get email() {
        return this.props.email;
    }
    get senha() {
        return this.props.senha;
    }
    get historico() {
        return this.props.historico;
    }
}
