import { ObterPerguntaInputDto, ObterPerguntaOutputDto } from "../../aplication/useCasesPergunta/obter_pergunta.usecase";
export interface PerguntaGateway{
    obterPergunta(dados: ObterPerguntaInputDto): Promise<ObterPerguntaOutputDto>;
}