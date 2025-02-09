import axios from "axios";
import { UseCase } from "../usecase";
import { Planta } from "../../domain/entities/planta.entity";
import { ResultRepoFirebase } from "../../persistence/result_repo_firebase";

export type CriarResultadoMapaInputDto = {
    pais: string;
}

export type CriarResultadoMapaOutputDto = {
    resultado: {
        id: string;
        dataBusca: string;
        tipoBusca: string;
        plantas: {
            id: string;
            nome: string;
            nomeCientifico: string;
            imagem: string;
            descricao: string;
            nivelDeCuidado: string;
            usoMedico: string;
            luminosidade: string;
        }[];
    };
};

export class CriarResultadoMapaUseCase implements UseCase<CriarResultadoMapaInputDto, CriarResultadoMapaOutputDto>{
    constructor( private resultRepoFirebase: ResultRepoFirebase){}

    public create( resultRepoFirebase: ResultRepoFirebase){
        return new CriarResultadoMapaUseCase(resultRepoFirebase);
    }

    async execute({pais}: CriarResultadoMapaInputDto): Promise<CriarResultadoMapaOutputDto>{
        let plantas_trefle: { common_name: string }[] = [];

        let url = `https://trefle.io/api/v1/species?token=YJ3VsoaJ5n-NkSRbrHCLzcCn1XLQkYN52iRbc3EFScU&filter[distribution]=${pais}`;
        
        axios.get(url).then((response) => {
            plantas_trefle = (response.data.data);
            }).catch((error) => {
            throw new Error(error);
        });

        let nomePlantasSelecionadas = [];
        let contador = 0;
        let plantasProntas: Planta[] = [];

        while (contador < 8){
            nomePlantasSelecionadas.push(plantas_trefle[contador].common_name);
            contador++;
        }

        for(let nome of nomePlantasSelecionadas){

            const url_perenual1 = `https://perenual.com/api/species-list?key=sk-g3X1678e55cae03338309&q=${nome}`;
        
            let response = await axios.get(url_perenual1);
            let id_planta = response.data.data[0].id;

            const url_perenual2 = `https://perenual.com/api/species/details/${id_planta}?key=sk-g3X1678e55cae03338309`;
    
            axios.get(url_perenual2).then((response) => {

                let planta:Planta = Planta.create(
                    (response.data).common_name,
                    (response.data).scientific_name[0],
                    (response.data).default_image.original_url,
                    (response.data).description,
                    (response.data).care_level,
                    (response.data).medicinal,
                    (response.data).sunlight[0]
                );

                plantasProntas.push(planta);
            }).catch((error) => {
                throw new Error(error);
            });
        }
        
        return this.resultRepoFirebase.criarResultado({plantas: plantasProntas, tipo: 'mapa'});
    }
}