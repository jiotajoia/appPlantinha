import { db } from "./firebase_config/firebase";
export class PerguntaRepoFirebase {
    async obterPergunta(dados) {
        try {
            const { id } = dados;
            const pergunta = await db.collection("perguntas").doc(id).get();
            if (!pergunta.exists) {
                throw new Error("Pergunta não encontrada");
            }
            return pergunta.data();
        }
        catch (error) {
            console.error("Erro ao obter pergunta:", error.message);
            throw error;
        }
    }
}
