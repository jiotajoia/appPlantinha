import axios from "axios";
import { ResultadoGateway } from "../../domain/gateways/resultado.gateway";
import { UseCase } from "../usecase";
import { Planta } from "../../domain/entities/planta.entity";
import { UserRepoFirebase } from "../../persistence/user_repo_firebase";
import { Pergunta } from "../../domain/entities/pergunta.entity";
import { filter } from "cheerio/lib/api/traversing";
import { ResultRepoFirebase } from "../../persistence/result_repo_firebase";

export type CriarResultadoInputDto = {
    idUser: string;
    respostas: JSON;
}

export type CriarResultadoOutputDto = {
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

export type CriarRepoResultadoInputDto = {
    plantas: Planta[];
}

export type CriarRepoResultadoOutputDto = {
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
}

export type AdicionarResultadoInputDto = {
    idUser: string,
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
}

export type AdicionarResultadoOutputDto = void;

export class CriarResultadoUseCase implements UseCase<CriarResultadoInputDto, CriarResultadoOutputDto>{
    constructor(private userRepoFirebase: UserRepoFirebase, private resultRepoFirebase: ResultRepoFirebase){}

    public create(userRepoFirebase: UserRepoFirebase, resultRepoFirebase: ResultRepoFirebase){
        return new CriarResultadoUseCase(userRepoFirebase, resultRepoFirebase);
    }

    async execute({idUser, respostas}: CriarResultadoInputDto): Promise<CriarResultadoOutputDto>{
        let plantas_trefle: { common_name: string }[] = [];

        /*
        let perguntas: Pergunta[] = [
            Pergunta.create('A planta é uma árvore?', ['01', '02', '03'], 'filtro_A',['true','false',null]),
        ];
        */

        let url = 'https://trefle.io/api/v1/species?token=YJ3VsoaJ5n-NkSRbrHCLzcCn1XLQkYN52iRbc3EFScU';
        //fazer filtragem , imagino que poderia ser feito com as respostas sendo um json e e cada campo com valor de filtro

        /*
        let respostas1 = {
            avarage_heigh : '3m',
            ediale: 'false',
            flower: 'true',
        }
        */

        Object.entries(respostas).forEach(([chave, valor]) => {
            if(valor != null){
                url += `&filter[${chave}]=${valor}`;
            }
        });

        //Pergunta: A planta é uma arvore?
        //Pergunta: A planta é encontrada no Brazil?
        //Pergunta: A planta é toxica?
        //Pergunta: A planta é medicinal?
        //Pergunta: As folhas da planta caem no outono?
        //Pergunta: A flores são vermelhas/azuis/brancas/roxas/rosas/amarelas?
        //Pergunta: A planta é comumente encontrada em florestas/areas umidas/campo aberto/ deserto?
        //Pergunta: A planta é de sol/sombra/ equilibrado?
        //Pergunta: A planta é muito/pouco/medio tolerante seca?
        
        //Pergunta: A planta é comestivel?
        //sim =  true // direcionar para pergunta de qual parte é comestivel
        //não =  false
        //talvez = null() //direcionar para outra pergunta
  
        axios.get(url).then((response) => {
            plantas_trefle = (response.data.data);
            }).catch((error) => {
            throw new Error(error);
        });

        let nomePlantasSelecionadas = [];
        let contador = 0;
        let plantasProntas: Planta[] = [];

        while (contador < 5){
            nomePlantasSelecionadas.push(plantas_trefle[contador].common_name);
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
        
        let resultado =  this.resultRepoFirebase.criarResultado({plantas: plantasProntas});
        await this.userRepoFirebase.adicionarResultado({idUser, resultado: resultado.resultado});

        return resultado;
    }
}