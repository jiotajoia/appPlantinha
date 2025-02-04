export class ObterHistoricoUseCase {
    userRepoFirebase;
    constructor(userRepoFirebase) {
        this.userRepoFirebase = userRepoFirebase;
    }
    create(userRepoFirebase) {
        return new ObterHistoricoUseCase(userRepoFirebase);
    }
    async execute({ idUser }) {
        return await this.userRepoFirebase.obterHistorico({ idUser });
    }
}
