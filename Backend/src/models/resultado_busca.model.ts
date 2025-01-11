class ResultadoBusca {
    idBusca: number;
    dataBusca: string;
    tipoBusca: string;
    plantas: Planta[];
  
    constructor(idBusca: number, dataBusca: string, tipoBusca: string, plantas: Planta[]) {
      this.idBusca = idBusca;
      this.dataBusca = dataBusca;
      this.tipoBusca = tipoBusca;
      this.plantas = plantas;
    }
  }