import { auth, db } from "./firebase_config/firebase";
export class UserRepoFirebase {
    async criarUser(dados) {
        try {
            const userRecord = await auth.createUser({
                email: dados.email,
                password: dados.senha,
            });
            const usuarioRef = db.collection("users").doc(userRecord.uid);
            await usuarioRef.set({
                id: userRecord.uid,
                nome: dados.nome,
                email: dados.email,
            });
            usuarioRef.collection("historico").doc();
        }
        catch (error) {
            if (error.code === "auth/email-already-exists") {
                console.error("Erro: O e-mail já está cadastrado.");
            }
            else {
                console.error("Erro ao criar usuário:", error.message);
            }
            throw error;
        }
    }
    async obterUser(dados) {
        try {
            const { idToken } = dados;
            const decodedToken = await auth.verifyIdToken(idToken);
            const user = await db.collection("users").doc(decodedToken.uid).get();
            if (!user.exists) {
                throw new Error("Usuario não encontrado");
            }
            return user.data();
        }
        catch (error) {
            console.error("Erro ao obter usuário:", error.message);
            throw error;
        }
    }
    async deleteUser(dados) {
        const { id } = dados;
        await auth.deleteUser(id);
        await db.collection("users").doc(id).delete();
    }
    async updateUserName(dados) {
        await db.collection("users").doc(dados.id).update({
            nome: dados.novoNome,
        });
        const userUpdated = (await db.collection("users").doc(dados.id).get()).data();
        return userUpdated;
    }
    async updateUserPassword(dados) {
        await auth.updateUser(dados.id, { password: dados.novoSenha });
        const user = (await db.collection('users').doc(dados.id).get()).data();
        return user;
    }
    async adicionarResultado(dados) {
        const { idUser, resultado } = dados;
        await db.collection('users').doc(idUser).collection('historico').doc(resultado.id).set({
            id: resultado.id,
            dataBusca: resultado.dataBusca,
            tipoBusca: resultado.tipoBusca
        });
        resultado.plantas.forEach((planta) => {
            const plantaRef = db.collection('users').doc(idUser).collection('historico').doc(resultado.id).collection('plantas').doc(planta.id);
            db.batch().set(plantaRef, planta);
        });
        await db.batch().commit();
    }
    async obterHistorico(dados) {
        const { idUser } = dados;
        const historico = (await db.collection('users').doc(idUser).get()).data()?.historico;
        return historico;
    }
    async limparHistorico(dados) {
        const { idUser } = dados;
        await db.collection('users').doc(idUser).update({ historico: [] });
        return { mensagem: "Histórico limpo com sucesso" };
    }
}
