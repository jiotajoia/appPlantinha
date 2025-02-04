import axios from "axios";
import { Planta } from "../../domain/entities/planta.entity";
import { Pergunta } from "../../domain/entities/pergunta.entity";
export class PreencherResultadoUseCase {
    userRepoFirebase;
    resultGateway;
    constructor(userRepoFirebase, resultGateway) {
        this.userRepoFirebase = userRepoFirebase;
        this.resultGateway = resultGateway;
    }
    create(userRepoFirebase, resultGateway) {
        return new PreencherResultadoUseCase(userRepoFirebase, resultGateway);
    }
    async execute({ idUser, idResultado, respostas }) {
        let plantas_trefle = [];
        let perguntas = [
            Pergunta.create('A planta é uma árvore?', ['01', '02', '03'], ''),
        ];
        let url = 'https://trefle.io/api/v1/species?token=YJ3VsoaJ5n-NkSRbrHCLzcCn1XLQkYN52iRbc3EFScU';
        //fazer filtragem , imagino que poderia ser feito com as respostas sendo um json e e cada campo com valor de filtro
        let respostas1 = {
            avarage_heigh: true,
            ediable: '',
            flower: '',
        };
        Object.entries(respostas1).forEach(([chave, valor]) => {
            if (valor != null) {
                url += `&filter[${chave}]=${valor}`;
            }
        });
        /*

        if(resposta1.eable_parts != null){
            url += `&filter[average_height]=${respostas.tamanho}`;

        }
            
        if(){
        }
        */
        //Pergunta: A planta é uma arvore?
        //Pergunta: A planta é encontrada no Brazil?
        //Pergunta: A planta é toxica?
        //Pergunta: A planta é medicinal?
        //Pergunta: A planta é comestivel?
        //sim = (filter_not ediable_parts = null) // direcionar para pergunta de qual parte é comestivel
        //não = 
        //talvez = () //direcionar para outra pergunta
        //Pergunta: 
        // filter e filter_not
        axios.get(url).then((response) => {
            plantas_trefle = (response.data.data);
        }).catch((error) => {
            throw new Error(error);
        });
        let nomePlantasSelecionadas = [];
        let contador = 0;
        let plantasProntas = [];
        while (contador < 5) {
            nomePlantasSelecionadas.push(plantas_trefle[contador].common_name);
        }
        for (let nome of nomePlantasSelecionadas) {
            const url_perenual1 = `https://perenual.com/api/species-list?key=sk-g3X1678e55cae03338309&q=${nome}`;
            let response = await axios.get(url_perenual1);
            let id_planta = response.data.data[0].id;
            const url_perenual2 = `https://perenual.com/api/species/details/${id_planta}?key=sk-g3X1678e55cae03338309`;
            axios.get(url_perenual2).then((response) => {
                let planta = Planta.create((response.data).common_name, (response.data).scientific_name[0], (response.data).default_image.original_url, (response.data).description, (response.data).care_level, (response.data).medicinal, (response.data).sunlight[0]);
                plantasProntas.push(planta);
            }).catch((error) => {
                throw new Error(error);
            });
        }
        let resultado = await this.resultGateway.atualizarResultado({ idUser, idResultado, plantas: plantasProntas });
        this.userRepoFirebase.adicionarResultado(resultado);
        return resultado;
    }
}
