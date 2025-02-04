import { db } from "./firebase_config/firebase";
export class ResultRepoFirebase {
    async obterResultado(dados) {
        const { idUser, idResultado } = dados;
        const resultado = (await db.collection('users').doc(idUser).collection('historico').doc(idResultado).get()).data();
        return resultado;
    }
    async atualizarResultado(dados) {
        const { idUser, idResultado, plantas } = dados;
        await db.collection('users').doc(idUser).collection('historico').doc(idResultado).update({ plantas: plantas });
        const resultadoAtualizado = (await db.collection('users').doc(idUser).collection('historico').doc(idResultado).get()).data();
        return resultadoAtualizado;
    }
    async deletarResultado(dados) {
        const { idUser, idResultado } = dados;
        await db.collection('users').doc(idUser).collection('historico').doc(idResultado).delete();
        return { mensagem: "usuário deletado com sucesso" };
    }
    criarResultado(dados) {
        throw new Error("Method not implemented.");
    }
}
