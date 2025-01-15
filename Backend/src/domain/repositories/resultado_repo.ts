import { ResultadoBusca } from "../models/resultado_busca.model";

export interface Resultado_repo{
    atualizar_resultado(id: number, plantas: JsonWebKey): ResultadoBusca

    obter_resultado(id: number): ResultadoBusca

    delete_resultado(id:number): ResultadoBusca

    criar_resultado(plantas: JsonWebKey,tipo: string): ResultadoBusca
}