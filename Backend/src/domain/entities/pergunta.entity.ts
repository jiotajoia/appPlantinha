export type PerguntaProps = {
    id: string;
    indagacao: string;
    filtro: string;
    indicacao: string[];
}

/*
let pergunta1 ={ 
    id = '01',
    indagacao = 'A planta é comestivel?',
    indicacao = ['02','05','08'],

    filtro = 'ediable_parts',

    alternativas = ['true','false',null],


    filter{
        filter_type: "ediable_parts",
        valor: true
    }
    
    filter{
        ediable_parts: true
    }

    

}
//front
let respostas = {}

respostas.add{pergunta1.filtro: alternativas[alternativa_escolhida]};
*/
export class Pergunta{
    constructor(private props: PerguntaProps){}

    public static create(indagacao: string, indicacao: string[], filtro: string){
        return new Pergunta({
            id: crypto.randomUUID.toString(),
            indagacao,
            indicacao,
            filtro
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