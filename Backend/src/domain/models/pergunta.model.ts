class Pergunta{
    idPergunta: number;
    indagacao: string;
    opcoes: string[];

    constructor(idPergunta: number, indagacao: string, opcoes: string[]){
        this.idPergunta = idPergunta;
        this.indagacao = indagacao;
        this.opcoes = opcoes;
    }
}