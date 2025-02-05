import { UserRepoFirebase } from "../../persistence/user_repo_firebase";
import { UseCase } from "../usecase";

export type DeletarUsuarioInputDto = {
    id: string;
}

export type DeletarUsuarioOutputDto = void;

export class DeletarUsuarioUseCase implements UseCase<DeletarUsuarioInputDto, DeletarUsuarioOutputDto>{
    constructor(private readonly userRepoFireBase: UserRepoFirebase){}

    public create(userRepoFireBase: UserRepoFirebase){
        return new DeletarUsuarioUseCase(userRepoFireBase);
    }

    async execute({id}: DeletarUsuarioInputDto): Promise<void>{
        await this.userRepoFireBase.deleteUser({id});
    }

}