import axios from "axios";
import { UseCase } from "../usecase";
import { Planta } from "../../domain/entities/planta.entity";
import { ResultRepoFirebase } from "../../persistence/result_repo_firebase";

export type CriarResultadoMapaInputDto = {
    pais: string;
}

export type CriarResultadoMapaOutputDto = {
    id: string;
    dataBusca: string;
    tipoBusca: string;
    plantas: {
        id: string ;
        nome: string | null;
        nomeCientifico: string | null;
        imagem: string | null;
        descricao: string | null;
        nivelDeCuidado: string | null;
        usoMedico: string | null;
        luminosidade: string | null;
    }[] | null;
};

export class CriarResultadoMapaUseCase implements UseCase<CriarResultadoMapaInputDto, CriarResultadoMapaOutputDto>{
    constructor( private resultRepoFirebase: ResultRepoFirebase){}

    public create( resultRepoFirebase: ResultRepoFirebase){
        return new CriarResultadoMapaUseCase(resultRepoFirebase);
    }

    async execute({pais}: CriarResultadoMapaInputDto): Promise<CriarResultadoMapaOutputDto>{
        let plantas_trefle: { scientific_name: string }[] = [];

        let url = `https://trefle.io/api/v1/species?token=YJ3VsoaJ5n-NkSRbrHCLzcCn1XLQkYN52iRbc3EFScU&filter[distribution]=${pais}`;
        
        await axios.get(url).then((response) => {
            plantas_trefle = (response.data.data);
            }).catch((error) => {
            throw new Error(error);
        });

        let nomePlantasSelecionadas: String[] = [];
        let contador = 0;
        let plantasProntas: Planta[] = [];

        for (let planta_trefle of plantas_trefle){
            nomePlantasSelecionadas.push(planta_trefle.scientific_name);
        }

        for(let nome of nomePlantasSelecionadas){

            if(contador > 3){
                break;
            }

            const url_perenual1 = `https://perenual.com/api/species-list?key=sk-keQt67aa93d93caa98593&q=${nome}`;

            let id_planta: string | null = null;
            await axios.get(url_perenual1).then((response) =>{

                if (response.data.data[0] && response.data.data[0].cycle != `Upgrade Plans To Premium/Supreme - https://perenual.com/subscription-api-pricing. I'm sorry`){
                   id_planta = response.data.data[0].id;
                   contador++
                }
            }).catch((error) => {
                console.error('erro em criar resultado mapa: '+ error);
            });

            if(id_planta == null){
                continue;
            }
            //chave1:sk-oUZj67aa964e242d68309
            //chave2:sk-keQt67aa93d93caa98593
            await new Promise((resolve) => setTimeout(resolve, 1000));

            const url_perenual2 = `https://perenual.com/api/species/details/${id_planta}?key=sk-keQt67aa93d93caa98593`;
    
            await axios.get(url_perenual2).then((response) => {
                console.log(response.data);
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

            await new Promise((resolve) => setTimeout(resolve, 1000));
        }
        
        return this.resultRepoFirebase.criarResultado({plantas: plantasProntas, tipo: 'mapa'}).resultado;
    }
}