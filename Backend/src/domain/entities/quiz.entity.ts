import { Pergunta } from "./pergunta.entity";
import { ResultadoBusca } from "./resultado_busca.entity";

export type QuizProps = {
    id: string;
    perguntas: Pergunta[];
    resultado: ResultadoBusca;
}

export class Quiz{
    constructor(private props: QuizProps){}

    public static create(resultado: ResultadoBusca){
        return new Quiz({
            id: crypto.randomUUID().toString(),
            perguntas: [],
            resultado
        });
    }

    public static with(props: QuizProps) {
        return new Quiz(props);
    }

    public get id(){
        return this.props.id;
    }

    public get perguntas(){
        return this.props.perguntas;
    }

    public get resultado(){
        return this.props.resultado;
    }
}