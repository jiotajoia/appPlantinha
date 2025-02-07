export class AlterarSenhaUsuarioUseCase {
    userRepoFirebase;
    constructor(userRepoFirebase) {
        this.userRepoFirebase = userRepoFirebase;
    }
    create(userRepoFirebase) {
        return new AlterarSenhaUsuarioUseCase(userRepoFirebase);
    }
    async execute({ id, novoSenha, confirmaSenha }) {
        return await this.userRepoFirebase.updateUserPassword({ id, novoSenha, confirmaSenha });
    }
}
