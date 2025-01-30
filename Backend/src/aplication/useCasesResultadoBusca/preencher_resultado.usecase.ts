import axios from "axios";
import { ResultadoBusca } from "../../domain/entities/resultado_busca.entity";
import { ResultadoGateway } from "../../domain/gateways/resultado.gateway";
import { UserGateway } from "../../domain/gateways/user.gateway";
import { UseCase } from "../usecase";
import { Planta } from "../../domain/entities/planta.entity";
import { UserRepoFirebase } from "../../persistence/user_repo_firebase";

export type PreencherResultadoInputDto = {
    idUser: string;
    idResultado: string;
    respostas: string[];
}

export type PreencherResultadoOutputDto = {
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

export type atualizarResultadoInputDto = {
    id: string;
    plantas: Planta[];
}

export type adicionarResultadoInputDto = {
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

export type adicionarResultadoOutputDto = void;

export class PreencherResultadoUseCase implements UseCase<PreencherResultadoInputDto, PreencherResultadoOutputDto>{
    constructor(private userRepoFirebase: UserRepoFirebase, private resultGateway: ResultadoGateway){}

    public create(userRepoFirebase: UserRepoFirebase, resultGateway: ResultadoGateway){
        return new PreencherResultadoUseCase(userRepoFirebase, resultGateway);
    }

    async execute({idUser, idResultado, respostas}: PreencherResultadoInputDto): Promise<PreencherResultadoOutputDto>{
        let plantas_trefle: { common_name: string }[] = [];

        let url = 'https://trefle.io/api/v1/species?';
        //fazer filtragem , imagino que poderia ser feito com as respostas sendo um json e e cada campo com valor de filtro
        
        if(respostas.tamanho != null){
            url += `&filter[average_height]=${respostas.tamanho}`;

        }

        url += '&token=YJ3VsoaJ5n-NkSRbrHCLzcCn1XLQkYN52iRbc3EFScU';
  
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
        
        let resultado = await this.resultGateway.atualizarResultado({id: idResultado, plantas: plantasProntas});
        this.userRepoFirebase.adicionarResultado(resultado);

        let output = this.presentOutput(resultado);
        return output;
    }

    private presentOutput(resultado: ResultadoBusca): PreencherResultadoOutputDto {
        return {
            resultado: {
                id: resultado.id,
                dataBusca: resultado.dataBusca,
                tipoBusca: resultado.tipoBusca,
                plantas: resultado.plantas.map((planta) => ({
                    id: planta.id,
                    nome: planta.nome,
                    nomeCientifico: planta.nomeCientifico,
                    imagem: planta.imagem,
                    descricao: planta.descricao,
                    nivelDeCuidado: planta.nivelDeCuidado,
                    usoMedico: planta.usoMedico,
                    luminosidade: planta.luminosidade
                }))
            }
        }
    }
}
