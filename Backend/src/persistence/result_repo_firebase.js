import { ResultadoBusca } from "../domain/entities/resultado_busca.entity";
import { db } from "./firebase_config/firebase";
export class ResultRepoFirebase {
    async obterResultado(dados) {
        const { idUser, idResultado } = dados;
        const resultado = (await db.collection('users').doc(idUser).collection('historico').doc(idResultado).get()).data();
        return resultado;
    }
    async deletarResultado(dados) {
        const { idUser, idResultado } = dados;
        await db.collection('users').doc(idUser).collection('historico').doc(idResultado).delete();
        return { mensagem: "usuário deletado com sucesso" };
    }
    criarResultado(dados) {
        const { plantas } = dados;
        let resultado = ResultadoBusca.create('quiz', plantas);
        const resultadoDto = {
            resultado: {
                id: resultado.id,
                dataBusca: resultado.dataBusca,
                tipoBusca: resultado.tipoBusca,
                plantas: resultado.plantas.map(planta => ({
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
        };
        return resultadoDto;
    }
}
