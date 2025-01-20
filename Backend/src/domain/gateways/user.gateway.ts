import { AlterarUsuarioInputDto } from "../../aplication/useCasesUsuario/alterar_usuario.usecase";
import { CriarUsuarioInputDto } from "../../aplication/useCasesUsuario/criar_usuario.usecase";
import { DeletarUsuarioInputDto } from "../../aplication/useCasesUsuario/deletar_usuario.usecase";
import { ObterUsuarioInputDto } from "../../aplication/useCasesUsuario/obter_usuario.usecase";
import { Historico } from "../entities/historico.entity";
import { ResultadoBusca } from "../entities/resultado_busca.entity";
import { Usuario } from "../entities/usuario.entity";

export interface UserGateway{
    save(usuario: Usuario): Promise<void>;

    criarUser(dados: CriarUsuarioInputDto) : Promise<Usuario>;

    obterUser(dados: ObterUsuarioInputDto) : Promise<Usuario>;

    deleteUser(dados: DeletarUsuarioInputDto) : Promise<Usuario>;

    updateUser(dados: AlterarUsuarioInputDto): Promise<Usuario>;

    adicionarResultado(resultado: ResultadoBusca): Usuario;

    obterHistorico(idUser: string): Promise<Historico>;
    
    limparHistorico(idUser: string): Promise<string>;
}