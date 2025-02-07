import { ObterPerguntaInputDto, ObterPerguntaOutputDto } from "../aplication/useCasesPergunta/obter_pergunta.usecase";
import { PerguntaGateway } from "../domain/gateways/pergunta.gateway";
import { db } from "./firebase_config/firebase";

export class PerguntaRepoFirebase implements PerguntaGateway{
    async obterPergunta(dados: ObterPerguntaInputDto): Promise<ObterPerguntaOutputDto> {
        try {
            const { id } = dados;
            const pergunta = await db.collection("perguntas").doc(id).get();
        
            if (!pergunta.exists) {
              throw new Error("Pergunta não encontrada");
            }
        
            return pergunta.data() as ObterPerguntaOutputDto;
        } catch (error: any) {
          console.error("Erro ao obter pergunta:", error.message);
          throw error;
        }
    }
}