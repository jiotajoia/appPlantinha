export class DeletarResultadoUseCase {
    resultRepoFirebase;
    constructor(resultRepoFirebase) {
        this.resultRepoFirebase = resultRepoFirebase;
    }
    create(resultRepoFirebase) {
        return new DeletarResultadoUseCase(resultRepoFirebase);
    }
    async execute({ idUser, idResultado }) {
        return await this.resultRepoFirebase.deletarResultado({ idUser, idResultado });
    }
}
