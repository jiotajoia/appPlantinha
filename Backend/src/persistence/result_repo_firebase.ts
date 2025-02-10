import { CriarRepoResultadoInputDto, CriarRepoResultadoOutputDto } from "../aplication/useCasesResultadoBusca/criar_resultado.usecase";
import { DeletarResultadoInputDto, DeletarResultadoOutputDto } from "../aplication/useCasesResultadoBusca/deletar_resultado.usecase";
import { ObterResultadoInputDto, ObterResultadoOutputDto } from "../aplication/useCasesResultadoBusca/obter_resultado.usecase";
import { ResultadoBusca } from "../domain/entities/resultado_busca.entity";
import { ResultadoGateway } from "../domain/gateways/resultado.gateway";
import { db } from "./firebase_config/firebase";

export class ResultRepoFirebase implements ResultadoGateway{
    async obterResultado(dados: ObterResultadoInputDto): Promise<ObterResultadoOutputDto>{
        const {idUser, idResultado} = dados;
        return (await db.collection('users').doc(idUser).collection('historico').doc(idResultado).get()).data() as ObterResultadoOutputDto;
    }
    
    async deletarResultado(dados: DeletarResultadoInputDto): Promise<DeletarResultadoOutputDto> {
        const {idUser, idResultado} = dados;
        await db.collection('users').doc(idUser).collection('historico').doc(idResultado).delete();
        return {mensagem: "usuário deletado com sucesso"};
    }

    criarResultado(dados: CriarRepoResultadoInputDto): CriarRepoResultadoOutputDto{
        const {plantas, tipo} = dados;
        
        let resultado: ResultadoBusca = ResultadoBusca.create(tipo,plantas);

        const resultadoDto: CriarRepoResultadoOutputDto = {
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