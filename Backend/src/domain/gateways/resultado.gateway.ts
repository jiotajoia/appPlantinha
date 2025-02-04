import { CriarRepoResultadoInputDto, CriarRepoResultadoOutputDto } from "../../aplication/useCasesResultadoBusca/criar_resultado.usecase";
import { DeletarResultadoInputDto, DeletarResultadoOutputDto } from "../../aplication/useCasesResultadoBusca/deletar_resultado.usecase";
import { ObterResultadoInputDto, ObterResultadoOutputDto } from "../../aplication/useCasesResultadoBusca/obter_resultado.usecase";

export interface ResultadoGateway{

    obterResultado(dados: ObterResultadoInputDto): Promise<ObterResultadoOutputDto>;

    deletarResultado(dados: DeletarResultadoInputDto): Promise<DeletarResultadoOutputDto>;

    criarResultado(dados: CriarRepoResultadoInputDto): CriarRepoResultadoOutputDto;
}