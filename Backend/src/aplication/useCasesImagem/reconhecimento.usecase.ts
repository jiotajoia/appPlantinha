import { Planta } from "../../domain/entities/planta.entity";
import { ResultadoGateway } from "../../domain/gateways/resultado.gateway";
import { UserGateway } from "../../domain/gateways/user.gateway";
import { UseCase } from "../usecase";

export type ReconhecimentoInputDto = {
    idUser: string;
    imagem: any;
}

export type ReconhecimentoOutputDto = {
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
}

export class ReconhecimentoUseCase implements UseCase<ReconhecimentoInputDto, ReconhecimentoOutputDto>{
    constructor(private resultGateway: ResultadoGateway, private userGateway: UserGateway){}

    public create(resultGateway: ResultadoGateway, userGateway: UserGateway): ReconhecimentoUseCase{
        return new ReconhecimentoUseCase(resultGateway, userGateway);
    }

    async execute({idUser, imagem} :ReconhecimentoInputDto): Promise<ReconhecimentoOutputDto>{
        let plantas: Planta[] = [];

        let resultado = this.resultGateway.criarResultado({plantas,tipo: 'imagem'});
        this.userGateway.adicionarResultado({idUser, resultado: resultado.resultado});

        return resultado.resultado;
    }
}