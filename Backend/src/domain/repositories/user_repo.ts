import { AlterarUsuarioRequest } from "../../aplication/useCasesUsuario/alterar_usuario.command";
import { CriarUsuarioRequest } from "../../aplication/useCasesUsuario/criar_usuario.command";
import { ObterUsuarioRequest } from "../../aplication/useCasesUsuario/obter_usuario.command";
import { Historico } from "../entities/historico.entity";
import { ResultadoBusca } from "../entities/resultado_busca.entity";
import { Usuario } from "../entities/usuario.entity";

export interface UserRepo{
    criarUser(dadosRequest: CriarUsuarioRequest) : Promise<Usuario>;

    obterUser(dadosRequest: ObterUsuarioRequest) : Promise<Usuario> ;

    deleteUser(idUser: number) : Promise<Usuario>;

    updateUser(id: number, dadosRequest: AlterarUsuarioRequest): Promise<Usuario>;

    adicionarResultado(resultado: ResultadoBusca): Usuario;

    obterHistorico(idUser: number): Promise<Historico>;
    
    limparHistorico(idUser: number): Promise<string>;
}