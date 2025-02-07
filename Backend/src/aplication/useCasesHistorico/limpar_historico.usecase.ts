import { UserRepoFirebase } from "../../persistence/user_repo_firebase";
import { UseCase } from "../usecase";

export type LimparHistoricoInputDto = {
    idUser: string;
}

export type LimparHistoricoOutputDto = {
    mensagem: string;
}

export class LimparHistoricoUseCase implements UseCase<LimparHistoricoInputDto, LimparHistoricoOutputDto> {
    constructor(private userRepoFirebase: UserRepoFirebase){}

    public create(userRepoFirebase: UserRepoFirebase): LimparHistoricoUseCase {
        return new LimparHistoricoUseCase(userRepoFirebase);
    }

    async execute({idUser}: LimparHistoricoInputDto): Promise<LimparHistoricoOutputDto> {
        return await this.userRepoFirebase.limparHistorico({idUser});
    }
}