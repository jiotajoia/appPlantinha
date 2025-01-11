class Quiz{
    idQuiz: number;
    perguntas: Pergunta[];
    resultado: ResultadoBusca;

    constructor(idQuiz: number, perguntas: Pergunta[], resultado: ResultadoBusca){
        this.idQuiz = idQuiz;
        this.perguntas = perguntas;
        this.resultado = resultado;
    }
}