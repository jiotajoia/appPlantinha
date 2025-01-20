import { Historico } from "../../domain/entities/historico.entity";
import { UserGateway } from "../../domain/gateways/user.gateway";
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
                cuidados: string;
                curiosidades: string;
                ambiente: string;
                shadowOrLightType: string;
            }[];
        }[];
    }
}

export class ObterHistoricoUseCase implements UseCase<ObterHistoricoInputDto, ObterHistoricoOutputDto> {
    constructor(private userGateway: UserGateway) {}

    public create(userGateway: UserGateway): ObterHistoricoUseCase {
        return new ObterHistoricoUseCase(userGateway);
    }

    async execute({idUser}: ObterHistoricoInputDto): Promise<ObterHistoricoOutputDto> {
        const historico = await this.userGateway.obterHistorico(idUser);

        const output = this.outputPresent(historico);
        return output;
    }

    private outputPresent(historico: Historico): ObterHistoricoOutputDto {
        return {
            historico: {
                buscas: historico.buscas.map((busca) => ({
                    id: busca.id,
                    dataBusca: busca.dataBusca,
                    tipoBusca: busca.tipoBusca,
                    plantas: busca.plantas.map((planta) => ({
                        id: planta.id,
                        nome: planta.nome,
                        nomeCientifico: planta.nomeCientifico,
                        imagem: planta.imagem,
                        cuidados: planta.cuidados,
                        curiosidades: planta.curiosidades,
                        ambiente: planta.ambiente,
                        shadowOrLightType: planta.shadowOrLightType
                    }))
                }))
            }
        }
    }
}