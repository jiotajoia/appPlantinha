import { criarResultadoInputDto } from "../../aplication/useCasesImagem/reconhecimento.usecase";
import { DeletarResultadoInputDto, DeletarResultadoOutputDto } from "../../aplication/useCasesResultadoBusca/deletar_resultado.usecase";
import { ObterResultadoInputDto, ObterResultadoOutputDto } from "../../aplication/useCasesResultadoBusca/obter_resultado.usecase";
import { AtualizarResultadoInputDto, AtualizarResultadoOutputDto } from "../../aplication/useCasesResultadoBusca/preencher_resultado.usecase";
import { ResultadoBusca } from "../entities/resultado_busca.entity";

export interface ResultadoGateway{
    atualizarResultado(dados: AtualizarResultadoInputDto): Promise<AtualizarResultadoOutputDto>;

    obterResultado(dados: ObterResultadoInputDto): Promise<ObterResultadoOutputDto>;

    deletarResultado(dados: DeletarResultadoInputDto): Promise<DeletarResultadoOutputDto>;

    criarResultado(dados: criarResultadoInputDto): Promise<ResultadoBusca>;
}