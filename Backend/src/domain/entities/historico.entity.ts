import { ResultadoBusca } from "./resultado_busca.entity";

export type HistoricoProps = {
    buscas: ResultadoBusca[];
}
export class Historico{

    constructor(private props: HistoricoProps){}

    public static create(){
        return new Historico({
            buscas: []
        });
    }

    public get buscas(){
        return this.props.buscas;
    }
}