import { UserRepoFirebase } from "../../persistence/user_repo_firebase";
import { UseCase } from "../usecase";

export type AlterarNomeUsuarioInputDto = {
    id: string;
    novoNome: string;
}

export type AlterarNomeUsuarioOutputDto = {
    id: string;
    nome: string;
    email: string;
    historico:{
        id: string;
        dataBusca: string;
        tipoBusca: string;
        plantas:{
            id: string;
            nome: string;
            nomeCientifico: string;
            imagem: string;
            descricao: string;
            nivelDeCuidado: string;
            usoMedico: string;
            luminosidade: string;
        }[];
    }[] | null;
};


export class AlterarNomeUsuarioUseCase implements UseCase<AlterarNomeUsuarioInputDto, AlterarNomeUsuarioOutputDto>{

    constructor(private userFireBaseRepo: UserRepoFirebase){}

    public create(userFireBaseRepo: UserRepoFirebase){
        return new AlterarNomeUsuarioUseCase(userFireBaseRepo);
    }

    async execute({id, novoNome}: AlterarNomeUsuarioInputDto): Promise<AlterarNomeUsuarioOutputDto>{

        if (novoNome == '') {
            throw new Error("O nome não pode ser vazio");
        }
    
        return await this.userFireBaseRepo.updateUserName({id, novoNome}); 
    }
}