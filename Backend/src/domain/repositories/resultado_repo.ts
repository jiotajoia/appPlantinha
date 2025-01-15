import { ResultadoBusca } from "../models/resultado_busca.model";

export interface ResultadoRepo{
    atualizarResultado(id: number, plantas: JsonWebKey): ResultadoBusca;

    obterResultado(id: number): ResultadoBusca;

    deleteResultado(id:number): ResultadoBusca;

    criarResultado(plantas: JsonWebKey,tipo: string): ResultadoBusca;
}