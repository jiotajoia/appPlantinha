import { ResultadoBusca } from "../../domain/entities/resultado_busca.entity";
import { ResultadoGateway } from "../../domain/gateways/resultado.gateway";
import { UserGateway } from "../../domain/gateways/user.gateway";
import { UseCase } from "../usecase";

export type PreencherResultadoInputDto = {
    idUser: string;
    idResultado: string;
    respostas: string[];
}

export type PreencherResultadoOutputDto = {
    resultado: {
        id: string;
        dataBusca: string;
        tipoBusca: string;
        plantas: {
            id: string;
            nome: string;
            nomeCientifico: string;
            imagem: string;
            cuidados: string;
            curiosidades: string;
            ambiente: string;
            shadowOrLightType: string;
        }[];
    };
};

export type atualizarResultadoInputDto = {
    id: string;
    plantas: JsonWebKey;
}

export class PreencherResultadoUseCase implements UseCase<PreencherResultadoInputDto, PreencherResultadoOutputDto>{
    constructor(private userGateway: UserGateway, private resultGateway: ResultadoGateway){}

    public create(userGateway: UserGateway, resultGateway: ResultadoGateway){
        return new PreencherResultadoUseCase(userGateway, resultGateway);
    }

    async execute({idUser, idResultado, respostas}: PreencherResultadoInputDto): Promise<PreencherResultadoOutputDto>{
        

        let plantas:JsonWebKey = {};

        let resultado = await this.resultGateway.atualizarResultado({id: idResultado, plantas});
        this.userGateway.adicionarResultado(resultado);

        let output = this.presentOutput(resultado);
        return output;
    }

    private presentOutput(resultado: ResultadoBusca): PreencherResultadoOutputDto {
        return {
            resultado: {
                id: resultado.id,
                dataBusca: resultado.dataBusca,
                tipoBusca: resultado.tipoBusca,
                plantas: resultado.plantas.map((planta) => ({
                    id: planta.id,
                    nome: planta.nome,
                    nomeCientifico: planta.nomeCientifico,
                    imagem: planta.imagem,
                    cuidados: planta.cuidados,
                    curiosidades: planta.curiosidades,
                    ambiente: planta.ambiente,
                    shadowOrLightType: planta.shadowOrLightType
                }))
            }
        }
    }
}
