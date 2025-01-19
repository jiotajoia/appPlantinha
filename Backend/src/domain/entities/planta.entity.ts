export type PlantaProps = {
    id: string;
    nome: string;
    nomeCientifico: string;
    imagem: string;
    cuidados: string;
    curiosidades: string;
    ambiente: string;
    shadowOrLightType: string;
}

export class Planta{
    constructor(private props: PlantaProps){}

    public static create(nome: string, nomeCientifico: string, imagem: string, cuidados: string, curiosidades: string, ambiente: string, shadowOrLightType: string){
        return new Planta({
            id: crypto.randomUUID.toString(),
            nome, 
            nomeCientifico,
            imagem,
            cuidados, 
            curiosidades,
            ambiente,
            shadowOrLightType
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

    public get cuidados(){
        return this.props.cuidados;
    }

    public get curiosidades(){
        return this.props.curiosidades;
    }

    public get ambiente(){
        return this.props.ambiente;
    }

    public get shadowOrLightType(){
        return this.props.shadowOrLightType;
    }
}