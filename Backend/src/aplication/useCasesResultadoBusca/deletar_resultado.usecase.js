export class DeletarResultadoUseCase {
    resultRepoFirebase;
    constructor(resultRepoFirebase) {
        this.resultRepoFirebase = resultRepoFirebase;
    }
    create(resultRepoFirebase) {
        return new DeletarResultadoUseCase(resultRepoFirebase);
    }
    async execute({ idUser, idResultado }) {
        let mensagem = await this.resultRepoFirebase.deletarResultado({ idUser, idResultado });
        return mensagem;
    }
}
