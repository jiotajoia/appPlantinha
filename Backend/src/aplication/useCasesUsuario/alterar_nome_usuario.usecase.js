export class AlterarNomeUsuarioUseCase {
    userFireBaseRepo;
    constructor(userFireBaseRepo) {
        this.userFireBaseRepo = userFireBaseRepo;
    }
    create(userFireBaseRepo) {
        return new AlterarNomeUsuarioUseCase(userFireBaseRepo);
    }
    async execute({ id, novoNome }) {
        if (novoNome == '') {
            throw new Error("O nome não pode ser vazio");
        }
        return await this.userFireBaseRepo.updateUserName({ id, novoNome });
    }
}
