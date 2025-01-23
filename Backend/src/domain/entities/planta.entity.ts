export type PlantaProps = {
    id: string;
    nome: string;
    nomeCientifico: string;
    imagem: string;
    descricao: string;
    nivelDeCuidado: string;
    usoMedico: string;
    luminosidade: string;
}

export class Planta{
    constructor(private props: PlantaProps){}

    public static create(nome: string, nomeCientifico: string, imagem: string, descricao: string, nivelDeCuidado: string, usoMedico: string, luminosidade: string){
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

    public static with(props: PlantaProps){
        return new Planta(props);
    }

    public get id(){
        return this.props.id;
    }

    public get nome(){
        return this.props.nome;
    }

    public get nomeCientifico(){
        return this.props.nomeCientifico;
    }

    public get imagem(){
        return this.props.imagem;
    }

    public get descricao(){
        return this.props.descricao;
    }

    public get nivelDeCuidado(){
        return this.props.nivelDeCuidado;
    }

    public get usoMedico(){
        return this.props.usoMedico;
    }

    public get luminosidade(){
        return this.props.luminosidade;
    }
}