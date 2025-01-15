import { Pergunta } from "../models/pergunta.model";

export interface Pergunta_repo{

    obter_pergunta(id_pergunta: number): Pergunta
}