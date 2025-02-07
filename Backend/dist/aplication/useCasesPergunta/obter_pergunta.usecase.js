export class ObterPerguntaUseCase {
    perguntaRepoFirebase;
    constructor(perguntaRepoFirebase) {
        this.perguntaRepoFirebase = perguntaRepoFirebase;
    }
    create(perguntaRepoFirebase) {
        return new ObterPerguntaUseCase(perguntaRepoFirebase);
    }
    async execute({ id }) {
        return await this.perguntaRepoFirebase.obterPergunta({ id });
    }
}
