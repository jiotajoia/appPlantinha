import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { PasswordRoutes } from './presentation/routes/password_routes';
import { UserRoutes } from './presentation/routes/user_routes';
import { PerguntaRoutes } from './presentation/routes/pergunta_routes';
import { ResultadoRoutes } from './presentation/routes/resultado_routes';
//import { ImagemRoutes } from "./presentation/routes/imagem_routes";
import { HistoricoRoutes } from "./presentation/routes/historico_routes";
import { db } from './persistence/firebase_config/firebase';

const port = 3000;
const perenual = process.env.API_KEY_PERENUAL;

if (!perenual) {
    console.log('Variável não carregada!');
}
console.log('perenual: ', perenual);

const app = express();

app.use(express.json());

// Iniciando as rotas
new PasswordRoutes(app); //verificado, funcionamento esperado.
new UserRoutes(app); //verificado, funcionamento esperado.
new PerguntaRoutes(app);//verificado, funcionamento esperado. obs: falta Adicionar perguntas no bando de dados
new ResultadoRoutes(app);//verificado, funcionamento esperado. obs : lembrar de esconder as chave de api na implementaçao
new HistoricoRoutes(app);//verificado, funcionamento parcialmente esperado. obs: é necessario perceber como o firebase devolve os dados, pode ser que exista uma incongruencia.
//new ImagemRoutes(app);

/*
app.get('/preencherPerguntas', async (req, res) => {
    let perguntas = [
        {
            id: '01',
            indagacao: 'A planta é comestivel?',
            indicacao: ['05','04','05'],
            filtro: 'ediable',
            alternativas: ['true','false',null],
        },//inicial
        {
            id: '02',
            indagacao: 'A planta é uma árvore?',
            indicacao: ['20','22','22'],
            filtro: 'growth_form',
            alternativas: ['tree',null,null],
        },
        {
            id: '03',
            indagacao: 'A planta é encontrada no Brasil?',
            indicacao: ['08','30','30'],
            filtro: 'distribution',
            alternativas: ['Brazil',null,null],
        },
        {
            id: '04',
            indagacao: 'A planta é toxica?',
            indicacao: ['05','05','05'],
            filtro: 'toxicity',
            alternativas: ['true','false',null],
        },
        {
            id: '05',
            indagacao: 'A planta é medicinal?',
            indicacao: ['02','02','02'],
            filtro: 'medicinal',
            alternativas: ['true','false',null],
        },
        {
            id: '06',
            indagacao: 'As folhas da planta caem em alguma determinada época?',
            indicacao: ['20','17','17'],
            filtro: 'cycle',
            alternativas: ['deciduous','evergreen',null],
        },
        {
            id: '07',
            indagacao: 'A planta é comumente encontrada em desertos?',
            indicacao: ['23','08','08'],
            filtro: 'habitat',
            alternativas: ['desert',null,null],
        },
        {
            id: '08',
            indagacao: 'A planta é comumente encontrada em florestas?',
            indicacao: ['02','09','09'],
            filtro: 'habitat',
            alternativas: ['forest',null,null],
        },
        {
            id: '09',
            indagacao: 'A planta é comumente encontrada em áreas úmidas?',
            indicacao: ['22','10','10'],
            filtro: 'habitat',
            alternativas: ['wetland',null,null],
        },
        {
            id: '10',
            indagacao: 'A planta é comumente encontrada em campo aberto?',
            indicacao: ['22','27','27'],
            filtro: 'habitat',
            alternativas: ['grassland',null,null],
        },
        {
            id: '11',
            indagacao: 'A flores são vermelhas?',
            indicacao: ['17','12','12'],
            filtro: 'flower_color',
            alternativas: ['red',null,null],
        },
        {
            id: '12',
            indagacao: 'A flores são azuis?',
            indicacao: ['17','13','13'],
            filtro: 'flower_color',
            alternativas: ['blue',null,null],
        },
        {
            id: '13',
            indagacao: 'A flores são brancas?',
            indicacao: ['17','14','14'],
            filtro: 'flower_color',
            alternativas: ['white',null,null],
        },
        {
            id: '14',
            indagacao: 'A flores são roxas?',
            indicacao: ['17','15','15'],
            filtro: 'flower_color',
            alternativas: ['purple',null,null],
        },
        {
            id: '15',
            indagacao: 'A flores são rosas?',
            indicacao: ['17','16','16'],
            filtro: 'flower_color',
            alternativas: ['pink',null,null],
        },
        {
            id: '16',
            indagacao: 'A flores são amarelas?',
            indicacao: ['17','17','17'],
            filtro: 'flower_color',
            alternativas: ['yellow',null,null],
        },
        {
            id: '17',
            indagacao: 'A planta é de sol?',
            indicacao: ['24','18','18'],
            filtro: 'sunlight',
            alternativas: ['full_sun',null,null],
        },
        {
            id: '18',
            indagacao: 'A planta é de sombra?',
            indicacao: ['24','19','19'],
            filtro: 'sunlight',
            alternativas: ['shade',null,null],
        },
        {
            id: '19',
            indagacao: 'A planta é relativamente de sol e sombra?',
            indicacao: ['24','24','24'],
            filtro: 'sunlight',
            alternativas: ['partial_shade',null,null],
        },
        {
            id: '20',
            indagacao: 'A planta tem altura por volta de 2 metros?',
            indicacao: ['24','21','21'],
            filtro: 'maximum_height',
            alternativas: ['2',null,null],
        },
        {
            id: '21',
            indagacao: 'A planta tem altura por volta de 5 metros?',
            indicacao: ['06', '06', '06'],
            filtro: 'maximum_height',
            alternativas: ['5',null,null],
        },
        {
            id: '22',
            indagacao: 'A planta é um arbusto?',
            indicacao: ['25', '23', '23'],
            filtro: 'growth_form',
            alternativas: ['shrub',null,null],
        },
        {
            id: '23',
            indagacao: 'A planta é um arbusto seco?',
            indicacao: ['18', '18', '18'],
            filtro: 'growth_form',
            alternativas: ['subshrub',null,null],
        },
        {
            id: '24',
            indagacao: 'A planta cresce rapido?',
            indicacao: ['25','25','25'],
            filtro: 'growth_rate',
            alternativas: ['fast','slow',null],
        },
        {
            id: '25',
            indagacao: 'A planta está ameaçada de extinção?',
            indicacao: ['03','03','03'],
            filtro: 'conservation_status',
            alternativas: ['endangered',null,null],
        },
        {
            id: '26',
            indagacao: 'A planta possui floração?',
            indicacao: ['11','17','11'],
            filtro: 'flowering',
            alternativas: ['true','false',null],
        },
        {
            id: '27',
            indagacao: 'A planta é muito tolerante seca?',
            indicacao: ['07','29','29'],
            filtro: 'drought_tolerance',
            alternativas: ['high','medium',null],
        },
        {
            id: '28',
            indagacao: 'A planta é pouco tolerante seca?',
            indicacao: ['09','29','29'],
            filtro: 'drought_tolerance',
            alternativas: ['low','medium',null],
        },
        {
            id: '29',
            indagacao: 'A planta é relativamente tolerante seca?',
            indicacao: ['03','03','03'],
            filtro: 'drought_tolerance',
            alternativas: ['medium','low',null],
        },
        {
            id: '30',
            indagacao: 'A planta é encontrada na Australia?',
            indicacao: ['08','07','10'],
            filtro: 'distribution',
            alternativas: ['Australia',null,null],
        },
    ];
    try{
        for(let pergunta of perguntas){
        await db.collection('perguntas').doc(pergunta.id).set({
            id : pergunta.id,
            indagacao : pergunta.indagacao,
            indicacao : pergunta.indicacao,
            filtro : pergunta.filtro,
            alternativas : pergunta.alternativas,
            })
        }
    res.send('dados enviados!');
    } catch(e){
        res.send(`nao deu certo bobao kkkkkkk ${e}`);
    }
});

type PlantaBanco = {
    id: string;
    nome: string;
    nomeCientifico: string;
    imagem: string;
    cuidados: string;
    curiosidade: string;
    nivelDeCuidado: string;
    medicinal: string;
    sunlight: string;
    ediable: string;
    growth_form: string;
    distribution: string;
    toxicity: string;
    cycle: string;
    habitat: string;
    flower_color: string;
    maximum_height: string;
    growth_rate: string;
    conservation_status : string;
    flowering: string;
    drought_tolerance: string;
}
*/

app.listen(port, '0.0.0.0', () => {
    console.log(`Servidor rodando na porta ${port}`);
});

        /*
        let perguntas: Pergunta[] = [
            Pergunta.create('A planta é uma árvore?', ['01', '02', '03'], 'filtro_A',['true','false',null]),
        ];
        */

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