import { UserGateway } from "../../domain/gateways/user.gateway";
import { UseCase } from "../usecase";

export type LimparHistoricoInputDto = {
    idUser: string;
}

export type LimparHistoricoOutputDto = {
    mensagem: string;
}

export class LimparHistoricoUseCase implements UseCase<LimparHistoricoInputDto, LimparHistoricoOutputDto> {
    constructor(private userGateway: UserGateway){}

    public create(userGateway: UserGateway): LimparHistoricoUseCase {
        return new LimparHistoricoUseCase(userGateway);
    }

    async execute({idUser}: LimparHistoricoInputDto): Promise<LimparHistoricoOutputDto> {
        const mensagem = await this.userGateway.limparHistorico(idUser);
        return { mensagem };
    }
}