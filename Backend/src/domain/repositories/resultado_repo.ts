import { ResultadoBusca } from "../entities/resultado_busca.entity";

export interface ResultadoRepo{
    atualizarResultado(id: number, plantas: JsonWebKey): Promise<ResultadoBusca>;

    obterResultado(id: number): Promise<ResultadoBusca>;

    deletarResultado(id:number): Promise<string>;

    criarResultado(plantas: JsonWebKey,tipo: string): Promise<ResultadoBusca>;
}