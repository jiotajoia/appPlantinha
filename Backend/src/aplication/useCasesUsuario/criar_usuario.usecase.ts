import { UserRepoFirebase } from "../../persistence/user_repo_firebase";
import { UseCase } from "../usecase";

export type CriarUsuarioInputDto = {
    nome: string;
    email: string;
    senha: string;
}

export type CriarUsuarioOutputDto = void;

export class CriarUsuarioUseCase implements UseCase<CriarUsuarioInputDto, CriarUsuarioOutputDto>{
    constructor(private readonly userRepoFireBase : UserRepoFirebase){}

    public create(userRepoFireBase : UserRepoFirebase){
        return new CriarUsuarioUseCase(userRepoFireBase);
    }

    async execute({nome, email, senha}: CriarUsuarioInputDto): Promise<void>{
        await this.userRepoFireBase.criarUser({nome, email, senha});
    }
}