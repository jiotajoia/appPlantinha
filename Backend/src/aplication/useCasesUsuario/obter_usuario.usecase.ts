import { Usuario } from "../../domain/entities/usuario.entity";
import { UserGateway } from "../../domain/gateways/user.gateway";
import { UserRepoFirebase } from "../../persistence/user_repo_firebase";
import { UseCase } from "../usecase";

export type ObterUsuarioInputDto = {
    idToken:string,
}

export type ObterUsuarioOutputDto = {
    usuario: {
        id: string;
        nome: string;
        email: string;
        historico: Array<{
            id: string;
            dataBusca: string;
            tipoBusca: string;
            plantas: {
                id: string;
                nome: string;
                nomeCientifico: string;
                imagem: string;
                descricao: string;
                nivelDeCuidado: string;
                usoMedico: string;
                luminosidade: string;
            }[];
        }>;
    };
};


export class ObterUsuarioUseCase implements UseCase<ObterUsuarioInputDto, ObterUsuarioOutputDto>{
    constructor(private readonly userRepoFirebase : UserRepoFirebase){}

    public create(userRepoFirebase : UserRepoFirebase){
        return new ObterUsuarioUseCase(userRepoFirebase);
    }

    async execute({idToken}: ObterUsuarioInputDto): Promise<ObterUsuarioOutputDto>{
        return await this.userRepoFirebase.obterUser({idToken});
    }
}