export type PerguntaProps = {
    id: string;
    indagacao: string;
    opcoes: string[];
}

export class Pergunta{
    constructor(private props: PerguntaProps){}

    public static create(indagacao: string){
        return new Pergunta({
            id: crypto.randomUUID.toString(),
            indagacao,
            opcoes: []
        })
    }

    public with(props: PerguntaProps){
        return new Pergunta(props);
    }

    public get id(){
        return this.props.id;
    }

    public get indagacao(){
        return this.props.indagacao;
    }

    public get opcoes(){
        return this.props.opcoes;
    }
}