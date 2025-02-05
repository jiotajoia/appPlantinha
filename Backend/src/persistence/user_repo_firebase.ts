import { CriarUsuarioInputDto } from "../aplication/useCasesUsuario/criar_usuario.usecase";
import { DeletarUsuarioInputDto } from "../aplication/useCasesUsuario/deletar_usuario.usecase";
import {ObterUsuarioInputDto, ObterUsuarioOutputDto,} from "../aplication/useCasesUsuario/obter_usuario.usecase";
import { UserGateway } from "../domain/gateways/user.gateway";
import { auth, db } from "./firebase_config/firebase";
import {AlterarNomeUsuarioInputDto, AlterarNomeUsuarioOutputDto,} from "../aplication/useCasesUsuario/alterar_nome_usuario.usecase";
import {AlterarSenhaUsuarioInputDto, AlterarSenhaUsuarioOutputDto,} from "../aplication/useCasesUsuario/alterar_senha_usuario.usecase";
import { ObterHistoricoInputDto, ObterHistoricoOutputDto } from "../aplication/useCasesHistorico/obter_historico.usecase";
import { LimparHistoricoInputDto, LimparHistoricoOutputDto } from "../aplication/useCasesHistorico/limpar_historico.usecase";
import { AdicionarResultadoInputDto, AdicionarResultadoOutputDto } from "../aplication/useCasesResultadoBusca/criar_resultado.usecase";

export class UserRepoFirebase implements UserGateway {
  async criarUser(dados: CriarUsuarioInputDto): Promise<void> {
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
    } catch (error: any) {
      if (error.code === "auth/email-already-exists") {
        console.error("Erro: O e-mail já está cadastrado.");
      } else {
        console.error("Erro ao criar usuário:", error.message);
      }
      throw error;
    }
  }

  async obterUser(dados: ObterUsuarioInputDto): Promise<ObterUsuarioOutputDto> {
    try {
      const { idToken } = dados;
      const decodedToken = await auth.verifyIdToken(idToken);
      const user = await db.collection("users").doc(decodedToken.uid).get();

      if (!user.exists) {
        throw new Error("Usuario não encontrado");
      }

      return user.data() as ObterUsuarioOutputDto;
    } catch (error: any) {
      console.error("Erro ao obter usuário:", error.message);
      throw error;
    }
  }

  async deleteUser(dados: DeletarUsuarioInputDto): Promise<void> {
    const { id } = dados;
    await auth.deleteUser(id);
    await db.collection("users").doc(id).delete();
  }

  async updateUserName(dados: AlterarNomeUsuarioInputDto): Promise<AlterarNomeUsuarioOutputDto> {
    await db.collection("users").doc(dados.id).update({
      nome: dados.novoNome,
    });

    const userUpdated = (await db.collection("users").doc(dados.id).get()).data() as AlterarNomeUsuarioOutputDto;

    return userUpdated;
  }

  async updateUserPassword(dados: AlterarSenhaUsuarioInputDto): Promise<AlterarSenhaUsuarioOutputDto> {
    await auth.updateUser(dados.id, { password: dados.novoSenha });
    const user = (await db.collection('users').doc(dados.id).get()).data() as AlterarSenhaUsuarioOutputDto;
    return user;
  }

  async adicionarResultado(dados: AdicionarResultadoInputDto): Promise<AdicionarResultadoOutputDto> {
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

  async obterHistorico(dados: ObterHistoricoInputDto): Promise<ObterHistoricoOutputDto> {
    const {idUser} = dados;
    const historico = (await db.collection('users').doc(idUser).get()).data()?.historico as ObterHistoricoOutputDto;
    return historico;
  }

  async limparHistorico(dados: LimparHistoricoInputDto): Promise<LimparHistoricoOutputDto> {
    const {idUser} = dados;
    await db.collection('users').doc(idUser).update({historico: []});
    return {mensagem: "Histórico limpo com sucesso"} as LimparHistoricoOutputDto;
  }
}