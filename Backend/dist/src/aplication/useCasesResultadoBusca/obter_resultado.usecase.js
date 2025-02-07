export class ObterResultadoUseCase {
    resultRepoFirebase;
    constructor(resultRepoFirebase) {
        this.resultRepoFirebase = resultRepoFirebase;
    }
    create(resultRepoFirebase) {
        return new ObterResultadoUseCase(resultRepoFirebase);
    }
    async execute({ idUser, idResultado }) {
        let resultado = await this.resultRepoFirebase.obterResultado({ idUser, idResultado });
        return resultado;
    }
}
