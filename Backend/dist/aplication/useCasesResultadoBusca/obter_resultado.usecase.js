export class ObterResultadoUseCase {
    resultRepoFirebase;
    constructor(resultRepoFirebase) {
        this.resultRepoFirebase = resultRepoFirebase;
    }
    create(resultRepoFirebase) {
        return new ObterResultadoUseCase(resultRepoFirebase);
    }
    async execute({ idUser, idResultado }) {
        return await this.resultRepoFirebase.obterResultado({ idUser, idResultado });
    }
}
