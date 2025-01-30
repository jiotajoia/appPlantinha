import { criarResultadoInputDto } from "../aplication/useCasesImagem/reconhecimento.usecase";
import { DeletarResultadoInputDto, DeletarResultadoOutputDto } from "../aplication/useCasesResultadoBusca/deletar_resultado.usecase";
import { ObterResultadoInputDto, ObterResultadoOutputDto } from "../aplication/useCasesResultadoBusca/obter_resultado.usecase";
import { AtualizarResultadoInputDto, AtualizarResultadoOutputDto } from "../aplication/useCasesResultadoBusca/preencher_resultado.usecase";
import { ResultadoBusca } from "../domain/entities/resultado_busca.entity";
import { ResultadoGateway } from "../domain/gateways/resultado.gateway";
import { db } from "./firebase_config/firebase";

export class ResultRepoFirebase implements ResultadoGateway{
    async obterResultado(dados: ObterResultadoInputDto): Promise<ObterResultadoOutputDto> {
        const {idUser, idResultado} = dados;
        const resultado = (await db.collection('users').doc(idUser).collection('historico').doc(idResultado).get()).data() as ObterResultadoOutputDto;
        return resultado;
    }
    async atualizarResultado(dados: AtualizarResultadoInputDto): Promise<AtualizarResultadoOutputDto> {
        const {idUser, idResultado, plantas} = dados;
        await db.collection('users').doc(idUser).collection('historico').doc(idResultado).update({plantas: plantas});
        const resultadoAtualizado = (await db.collection('users').doc(idUser).collection('historico').doc(idResultado).get()).data() as AtualizarResultadoOutputDto;
        return resultadoAtualizado;
    }
    
    async deletarResultado(dados: DeletarResultadoInputDto): Promise<DeletarResultadoOutputDto> {
        const {idUser, idResultado} = dados;
        await db.collection('users').doc(idUser).collection('historico').doc(idResultado).delete();
        return {mensagem: "usuário deletado com sucesso"}
    }
    criarResultado(dados: criarResultadoInputDto): Promise<ResultadoBusca> {
        throw new Error("Method not implemented.");
    }

}