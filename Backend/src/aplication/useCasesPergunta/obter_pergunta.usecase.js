export class ObterPerguntaUseCase {
    perguntaRepoFirebase;
    constructor(perguntaRepoFirebase) {
        this.perguntaRepoFirebase = perguntaRepoFirebase;
    }
    create(perguntaRepoFirebase) {
        return new ObterPerguntaUseCase(perguntaRepoFirebase);
    }
    async execute({ id }) {
        const pergunta = await this.perguntaRepoFirebase.obterPergunta({ id });
        const output = this.presentOutput(pergunta);
        return output;
    }
    presentOutput(pergunta) {
        return {
            id: pergunta.id,
            indagacao: pergunta.indagacao,
            indicacao: pergunta.indicacao,
            filtro: pergunta.filtro,
            alternativas: pergunta.alternativas,
        };
    }
}
