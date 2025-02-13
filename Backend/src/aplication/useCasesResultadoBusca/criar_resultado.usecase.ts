import axios from "axios";
import { UseCase } from "../usecase";
import { Planta } from "../../domain/entities/planta.entity";
import { UserRepoFirebase } from "../../persistence/user_repo_firebase";
import { ResultRepoFirebase } from "../../persistence/result_repo_firebase";

export type CriarResultadoInputDto = {
    idUser: string;
    respostas: any;
}

export type CriarResultadoOutputDto = {
    id: string;
    dataBusca: string;
    tipoBusca: string;
    plantas: {
        id: string;
        nome: string | null;
        nomeCientifico: string | null;
        imagem: string | null;
        descricao: string | null;
        nivelDeCuidado: string | null;
        usoMedico: string | null;
        luminosidade: string | null;
    }[] | null;
};

export type CriarRepoResultadoInputDto = {
    plantas: Planta[];
    tipo: string;
}

export type CriarRepoResultadoOutputDto = {
    resultado: {
        id: string;
        dataBusca: string;
        tipoBusca: string;
        plantas: {
            id: string;
            nome: string | null;
            nomeCientifico: string | null;
            imagem: string | null;
            descricao: string | null;
            nivelDeCuidado: string | null;
            usoMedico: string | null;
            luminosidade: string | null;
        }[] | null;
    };
}

export type AdicionarResultadoInputDto = {
    idUser: string,
    resultado: {
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
        }[] |  null;
    };
}

export type AdicionarResultadoOutputDto = void;

export class CriarResultadoUseCase implements UseCase<CriarResultadoInputDto, CriarResultadoOutputDto>{
    constructor(private userRepoFirebase: UserRepoFirebase, private resultRepoFirebase: ResultRepoFirebase){}

    public create(userRepoFirebase: UserRepoFirebase, resultRepoFirebase: ResultRepoFirebase){
        return new CriarResultadoUseCase(userRepoFirebase, resultRepoFirebase);
    }

    async execute({idUser, respostas}: CriarResultadoInputDto): Promise<CriarResultadoOutputDto>{ //esconder chaves de api
        let plantas_trefle: { scientific_name: string }[] = [];

        let url = 'https://trefle.io/api/v1/species?token=YJ3VsoaJ5n-NkSRbrHCLzcCn1XLQkYN52iRbc3EFScU';

        Object.entries(respostas).forEach(([chave, valor]) => {
            if(valor != 'null'){
                url += `&filter[${chave}]=${valor}`;
            }
        });

        console.log(url);
        await axios.get(url).then((response) => {
            plantas_trefle = (response.data.data);
            console.log('TREFLE: ' + response.data.data);
            }).catch((error) => {
            throw new Error(error);
        });

        let nomePlantasSelecionadas = [];
        let contador = 0;
        let plantasProntas: Planta[] = [];

        for (let plantaTrefle of plantas_trefle){
            nomePlantasSelecionadas.push(plantaTrefle.scientific_name);
        }

        for(let nome of nomePlantasSelecionadas){ //pode-se futuramente modularizar isso em função para ser usado aqui e no reconhecimento
            if(contador > 4){
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
        
        let resultado = this.resultRepoFirebase.criarResultado({plantas: plantasProntas, tipo: 'quiz'});

        await this.userRepoFirebase.adicionarResultado({idUser, resultado: resultado.resultado});

        return resultado.resultado;
    }
}