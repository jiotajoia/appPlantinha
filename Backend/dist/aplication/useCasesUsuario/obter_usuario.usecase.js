export class ObterUsuarioUseCase {
    userRepoFirebase;
    constructor(userRepoFirebase) {
        this.userRepoFirebase = userRepoFirebase;
    }
    create(userRepoFirebase) {
        return new ObterUsuarioUseCase(userRepoFirebase);
    }
    async execute({ idToken }) {
        return await this.userRepoFirebase.obterUser({ idToken });
    }
}
