import { Planta } from "./planta.entity";

export type resultProps = {
  id: string;
  dataBusca: string;
  tipoBusca: string;
  plantas: Planta[];
}

export class ResultadoBusca {
    constructor(private props: resultProps){}

    public static create(dataBusca: string, tipoBusca: string, plantas: Planta[]){
      return new ResultadoBusca({
        id: crypto.randomUUID.toString(),
        dataBusca, 
        tipoBusca, 
        plantas: []
      });
    }

    public static with(props: resultProps){
      return new ResultadoBusca(props);
    }

    public get id(){
      return this.props.id;
    }

    public get dataBusca(){
      return this.props.dataBusca;
    }

    public get tipoBusca(){
      return this.props.tipoBusca;
    }

    public get plantas(){
      return this.props.plantas;
    }
  }