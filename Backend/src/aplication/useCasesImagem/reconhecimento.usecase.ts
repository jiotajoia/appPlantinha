import axios from "axios";
import { Planta } from "../../domain/entities/planta.entity";
import { ResultRepoFirebase } from "../../persistence/result_repo_firebase";
import { UserRepoFirebase } from "../../persistence/user_repo_firebase";
import { UseCase } from "../usecase";

export type ReconhecimentoInputDto = {
    idUser: string;
    nomePlantas: string[];
}

export type ReconhecimentoOutputDto = {
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
}

export class ReconhecimentoUseCase implements UseCase<ReconhecimentoInputDto, ReconhecimentoOutputDto>{
    constructor(private resultGateway: ResultRepoFirebase, private userRepoFirebase: UserRepoFirebase){}

    public create(resultGateway: ResultRepoFirebase, userRepoFirebase: UserRepoFirebase): ReconhecimentoUseCase{
        return new ReconhecimentoUseCase(resultGateway, userRepoFirebase);
    }

    async execute({idUser, nomePlantas} :ReconhecimentoInputDto): Promise<ReconhecimentoOutputDto>{
        let plantasProntas: Planta[] = [];

        let contador = 0;

        for(let nome of nomePlantas){

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
        
        
        let resultado = this.resultGateway.criarResultado({plantas: plantasProntas,tipo: 'imagem'});
        this.userRepoFirebase.adicionarResultado({idUser, resultado: resultado.resultado});

        return resultado.resultado;
    }
}