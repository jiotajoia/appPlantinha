import { ResultadoBusca } from "./resultado_busca.entity";

export class Historico{
    buscas: ResultadoBusca[];

    constructor(buscas: ResultadoBusca[]){
        this.buscas = buscas;
    }
}