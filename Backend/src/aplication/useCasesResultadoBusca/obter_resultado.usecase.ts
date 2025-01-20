import { ResultadoBusca } from "../../domain/entities/resultado_busca.entity";
import { ResultadoGateway } from "../../domain/gateways/resultado.gateway";
import { UseCase } from "../usecase";

export type ObterResultadoInputDto = {
    id: string;
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
            cuidados: string;
            curiosidades: string;
            ambiente: string;
            shadowOrLightType: string;
        }[];
    };
};

export class ObterResultadoUseCase implements UseCase<ObterResultadoInputDto, ObterResultadoOutputDto>{
    constructor(private resultGateway: ResultadoGateway){}

    public create(resultGateway: ResultadoGateway){
        return new ObterResultadoUseCase(resultGateway);
    }

    async execute({id}: ObterResultadoInputDto): Promise<ObterResultadoOutputDto>{
        let resultado = await this.resultGateway.obterResultado({id});
        let output = this.presentOutput(resultado);
        return output;
    }

    private presentOutput(resultado: ResultadoBusca): ObterResultadoOutputDto {
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