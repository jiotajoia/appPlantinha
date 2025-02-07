import { LimparHistoricoInputDto, LimparHistoricoOutputDto } from "../../aplication/useCasesHistorico/limpar_historico.usecase";
import { ObterHistoricoInputDto, ObterHistoricoOutputDto } from "../../aplication/useCasesHistorico/obter_historico.usecase";
import { AdicionarResultadoInputDto, AdicionarResultadoOutputDto } from "../../aplication/useCasesResultadoBusca/criar_resultado.usecase";
import { AlterarNomeUsuarioInputDto, AlterarNomeUsuarioOutputDto } from "../../aplication/useCasesUsuario/alterar_nome_usuario.usecase";
import { AlterarSenhaUsuarioInputDto, AlterarSenhaUsuarioOutputDto } from "../../aplication/useCasesUsuario/alterar_senha_usuario.usecase";
import { CriarUsuarioInputDto } from "../../aplication/useCasesUsuario/criar_usuario.usecase";
import { DeletarUsuarioInputDto } from "../../aplication/useCasesUsuario/deletar_usuario.usecase";
import { ObterUsuarioInputDto, ObterUsuarioOutputDto } from "../../aplication/useCasesUsuario/obter_usuario.usecase";


export interface UserGateway{
    criarUser(dados: CriarUsuarioInputDto): Promise<void>;

    obterUser(dados: ObterUsuarioInputDto) : Promise<ObterUsuarioOutputDto>;

    deleteUser(dados: DeletarUsuarioInputDto) : Promise<void>;

    updateUserName(dados: AlterarNomeUsuarioInputDto): Promise<AlterarNomeUsuarioOutputDto>;

    updateUserPassword(dados: AlterarSenhaUsuarioInputDto): Promise<AlterarSenhaUsuarioOutputDto>;

    adicionarResultado(dados: AdicionarResultadoInputDto): Promise<AdicionarResultadoOutputDto>;

    obterHistorico(dados: ObterHistoricoInputDto): Promise<ObterHistoricoOutputDto>;
    
    limparHistorico(dados: LimparHistoricoInputDto): Promise<LimparHistoricoOutputDto>;
}