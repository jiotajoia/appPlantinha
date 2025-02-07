export class DeletarUsuarioUseCase {
    userRepoFireBase;
    constructor(userRepoFireBase) {
        this.userRepoFireBase = userRepoFireBase;
    }
    create(userRepoFireBase) {
        return new DeletarUsuarioUseCase(userRepoFireBase);
    }
    async execute({ id }) {
        await this.userRepoFireBase.deleteUser({ id });
    }
}
