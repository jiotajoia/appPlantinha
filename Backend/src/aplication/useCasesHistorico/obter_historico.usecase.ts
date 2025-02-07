import { UserRepoFirebase } from "../../persistence/user_repo_firebase";
import { UseCase } from "../usecase";

export type ObterHistoricoInputDto = {
    idUser: string;
}

export type ObterHistoricoOutputDto = {
    historico: {
        buscas: {
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
        }[];
    }
}

export class ObterHistoricoUseCase implements UseCase<ObterHistoricoInputDto, ObterHistoricoOutputDto> {
    constructor(private userRepoFirebase: UserRepoFirebase) {}

    public create(userRepoFirebase: UserRepoFirebase): ObterHistoricoUseCase {
        return new ObterHistoricoUseCase(userRepoFirebase);
    }

    async execute({idUser}: ObterHistoricoInputDto): Promise<ObterHistoricoOutputDto> {
        return await this.userRepoFirebase.obterHistorico({idUser});
    }
}