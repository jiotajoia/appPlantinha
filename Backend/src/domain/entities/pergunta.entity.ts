export type PerguntaProps = {
    id: string;
    indagacao: string;
    indicacao: string[];
    filtro: string;
    alternativas : string | null[];
}

/*

exemplo de uma pergunta

let pergunta1 ={ 
    id = '01',
    indagacao = 'A planta é comestivel?',
    indicacao = ['02','05','08'],
    filtro = 'ediable_parts',
    alternativas = ['true','false',null],
}

//front
cada pergunta é padronizada com respostas sim, nao e talvez

let respostas = {};
respostas é um json que vem do front

a cada pergunta respondida ocorre:
se n tiver adiciona, se ja tiver sobrescreve
respostas.add{pergunta1.filtro: alternativas[alternativa_escolhida]};

*/
export class Pergunta{
    constructor(private props: PerguntaProps){}

    public static create(indagacao: string, indicacao: string[], filtro: string,alternativas : string | null[]){
        return new Pergunta({
            id: crypto.randomUUID.toString(),
            indagacao,
            indicacao,
            filtro,
            alternativas
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

    public get indicacao(){
        return this.props.indicacao;
    }

    public get filtro(){
        return this.props.filtro;
    }
    public get alternativas(){
        return this.props.alternativas;
    }
}