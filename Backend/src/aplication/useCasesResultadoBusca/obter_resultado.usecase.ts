import { Planta } from "../../domain/entities/planta.entity";
import { ResultadoBusca } from "../../domain/entities/resultado_busca.entity";
import { ResultadoGateway } from "../../domain/gateways/resultado.gateway";
import { ResultRepoFirebase } from "../../persistence/result_repo_firebase";
import { UseCase } from "../usecase";

export type ObterResultadoInputDto = {
    idUser: string;
    idResultado: string;
}

export type ObterResultadoOutputDto = {
    resultado: {
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
    };
};

export class ObterResultadoUseCase implements UseCase<ObterResultadoInputDto, ObterResultadoOutputDto>{
    constructor(private resultRepoFirebase: ResultRepoFirebase){}

    public create(resultRepoFirebase: ResultRepoFirebase){
        return new ObterResultadoUseCase(resultRepoFirebase);
    }

    async execute({idUser, idResultado}: ObterResultadoInputDto): Promise<ObterResultadoOutputDto>{
        let resultado = await this.resultRepoFirebase.obterResultado({idUser, idResultado});
        return resultado;
    }
}