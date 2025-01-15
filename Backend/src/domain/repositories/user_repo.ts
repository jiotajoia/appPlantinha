import { Historico } from "../models/historico.model";
import { ResultadoBusca } from "../models/resultado_busca.model";
import { Usuario } from "../models/usuario.model";

export interface User_repo{
    criar_user() : Usuario;

    obter_user(email : string,senha: string) : Usuario;

    delete_user(id_user: number) : Usuario;

    update_user(id : number, dados): Usuario;

    adicionar_resultado(resultado: ResultadoBusca): Usuario;

    obter_historico(id_user: number): Historico;
    
    limpar_historico(id_user: number): Historico;
}