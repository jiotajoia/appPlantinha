import axios from "axios";
import { Planta } from "../../domain/entities/planta.entity.js";
export class CriarResultadoUseCase {
    userRepoFirebase;
    resultRepoFirebase;
    constructor(userRepoFirebase, resultRepoFirebase) {
        this.userRepoFirebase = userRepoFirebase;
        this.resultRepoFirebase = resultRepoFirebase;
    }
    create(userRepoFirebase, resultRepoFirebase) {
        return new CriarResultadoUseCase(userRepoFirebase, resultRepoFirebase);
    }
    async execute({ idUser, respostas }) {
        let plantas_trefle = [];
        console.log('chegou no use case');
        let url = 'https://trefle.io/api/v1/species?token=YJ3VsoaJ5n-NkSRbrHCLzcCn1XLQkYN52iRbc3EFScU';
        Object.entries(respostas).forEach(([chave, valor]) => {
            if (valor != 'null') {
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
        let plantasProntas = [];
        for (let plantaTrefle of plantas_trefle) {
            nomePlantasSelecionadas.push(plantaTrefle.scientific_name);
        }
        console.log(nomePlantasSelecionadas);
        for (let nome of nomePlantasSelecionadas) { //pode-se futuramente modularizar isso em função para ser usado aqui e no reconhecimento
            if (contador > 4) {
                break;
            }
            const url_perenual1 = `https://perenual.com/api/species-list?key=sk-keQt67aa93d93caa98593&q=${nome}`;
            let id_planta = null;
            await axios.get(url_perenual1).then((response) => {
                if (response.data.data[0] && response.data.data[0].cycle != `Upgrade Plans To Premium/Supreme - https://perenual.com/subscription-api-pricing. I'm sorry`) {
                    id_planta = response.data.data[0].id;
                    contador++;
                }
            }).catch((error) => {
                console.error('erro em criar resultado mapa: ' + error);
            });
            if (id_planta == null) {
                continue;
            }
            //chave1:sk-oUZj67aa964e242d68309
            //chave2:sk-keQt67aa93d93caa98593
            await new Promise((resolve) => setTimeout(resolve, 1000));
            const url_perenual2 = `https://perenual.com/api/species/details/${id_planta}?key=sk-keQt67aa93d93caa98593`;
            await axios.get(url_perenual2).then((response) => {
                console.log(response.data);
                let planta = Planta.create((response.data).common_name, (response.data).scientific_name[0], (response.data).default_image.original_url, (response.data).description, (response.data).care_level, (response.data).medicinal, (response.data).sunlight[0]);
                plantasProntas.push(planta);
            }).catch((error) => {
                throw new Error(error);
            });
            await new Promise((resolve) => setTimeout(resolve, 1000));
        }
        let resultado = this.resultRepoFirebase.criarResultado({ plantas: plantasProntas, tipo: 'quiz' });
        await this.userRepoFirebase.adicionarResultado({ idUser, resultado: resultado.resultado });
        return resultado.resultado;
    }
}
