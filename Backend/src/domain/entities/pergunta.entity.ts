export type PerguntaProps = {
    id: string;
    indagacao: string;
    indicacao: string[];
}

/*
let pergunta1 ={ 
    id = '01',
    indagacao = 'A planta é comestivel?'
    indicacao = ['02','05','08']
}
*/
export class Pergunta{
    constructor(private props: PerguntaProps){}

    public static create(indagacao: string, indicacao: string[]){
        return new Pergunta({
            id: crypto.randomUUID.toString(),
            indagacao,
            indicacao
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
}