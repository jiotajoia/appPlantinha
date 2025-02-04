export class LimparHistoricoUseCase {
    userRepoFirebase;
    constructor(userRepoFirebase) {
        this.userRepoFirebase = userRepoFirebase;
    }
    create(userRepoFirebase) {
        return new LimparHistoricoUseCase(userRepoFirebase);
    }
    async execute({ idUser }) {
        return await this.userRepoFirebase.limparHistorico({ idUser });
    }
}
