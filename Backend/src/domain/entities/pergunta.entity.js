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
let respostas = {};
respostas é um json que vem do front

a cada pergunta respondida ocorre:

respostas.add{pergunta1.filtro: alternativas[alternativa_escolhida]};

*/
export class Pergunta {
    props;
    constructor(props) {
        this.props = props;
    }
    static create(indagacao, indicacao, filtro) {
        return new Pergunta({
            id: crypto.randomUUID.toString(),
            indagacao,
            indicacao,
            filtro
        });
    }
    with(props) {
        return new Pergunta(props);
    }
    get id() {
        return this.props.id;
    }
    get indagacao() {
        return this.props.indagacao;
    }
}
