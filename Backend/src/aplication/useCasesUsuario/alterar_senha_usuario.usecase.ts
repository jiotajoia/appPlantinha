import { Usuario } from "../../domain/entities/usuario.entity";
import { UserGateway } from "../../domain/gateways/user.gateway";
import { UserRepoFirebase } from "../../persistence/user_repo_firebase";
import { UseCase } from "../usecase";

export type AlterarSenhaUsuarioInputDto = {
    id: string;
    novoSenha: string;
    confirmaSenha: string;
}

export type AlterarSenhaUsuarioOutputDto = {
    usuario: {
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
        }[];
    };
};


export class AlterarSenhaUsuarioUseCase implements UseCase<AlterarSenhaUsuarioInputDto, AlterarSenhaUsuarioOutputDto>{
    constructor(private readonly userRepoFirebase: UserRepoFirebase){}

    public create(userRepoFirebase: UserRepoFirebase){
        return new AlterarSenhaUsuarioUseCase(userRepoFirebase);
    }

    async execute({id, novoSenha, confirmaSenha}: AlterarSenhaUsuarioInputDto): Promise<AlterarSenhaUsuarioOutputDto>{
        return await this.userRepoFirebase.updateUserPassword({id, novoSenha, confirmaSenha});
    }

}