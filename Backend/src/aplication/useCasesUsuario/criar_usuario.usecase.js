export class CriarUsuarioUseCase {
    userRepoFireBase;
    constructor(userRepoFireBase) {
        this.userRepoFireBase = userRepoFireBase;
    }
    create(userRepoFireBase) {
        return new CriarUsuarioUseCase(userRepoFireBase);
    }
    async execute({ nome, email, senha }) {
        await this.userRepoFireBase.criarUser({ nome, email, senha });
    }
}
