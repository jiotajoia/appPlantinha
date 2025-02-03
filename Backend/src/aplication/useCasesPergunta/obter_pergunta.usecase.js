export class ObterPerguntaUseCase {
    perguntaGateway;
    constructor(perguntaGateway) {
        this.perguntaGateway = perguntaGateway;
    }
    create(perguntaGateway) {
        return new ObterPerguntaUseCase(perguntaGateway);
    }
    async execute({ id }) {
        const pergunta = await this.perguntaGateway.obterPergunta({ id });
        const output = this.presentOutput(pergunta);
        return output;
    }
    presentOutput(pergunta) {
        return {
            id: pergunta.id,
            indagacao: pergunta.indagacao,
            opcoes: pergunta.opcoes
        };
    }
}
