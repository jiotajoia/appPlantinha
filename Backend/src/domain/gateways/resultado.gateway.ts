import { criarResultadoInputDto } from "../../aplication/useCasesImagem/reconhecimento.usecase";
import { DeletarResultadoInputDto } from "../../aplication/useCasesResultadoBusca/deletar_resultado.usecase";
import { ObterResultadoInputDto } from "../../aplication/useCasesResultadoBusca/obter_resultado.usecase";
import { atualizarResultadoInputDto } from "../../aplication/useCasesResultadoBusca/preencher_resultado.usecase";
import { ResultadoBusca } from "../entities/resultado_busca.entity";

export interface ResultadoGateway{
    atualizarResultado(dados: atualizarResultadoInputDto): Promise<ResultadoBusca>;

    obterResultado(dados: ObterResultadoInputDto): Promise<ResultadoBusca>;

    deletarResultado(dados: DeletarResultadoInputDto): Promise<string>;

    criarResultado(dados: criarResultadoInputDto): Promise<ResultadoBusca>;
}