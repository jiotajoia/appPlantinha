import { ResultadoBusca } from "./resultado_busca.model";

export class Historico{
    buscas: ResultadoBusca[];

    constructor(buscas: ResultadoBusca[]){
        this.buscas = buscas;
    }
}