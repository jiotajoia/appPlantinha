import { Historico } from "../models/historico.model";
import { ResultadoBusca } from "../models/resultado_busca.model";
import { Usuario } from "../models/usuario.model";

export interface UserRepo{
    criarUser() : Usuario;

    obterUser(email : string,senha: string) : Usuario;

    deleteUser(idUser: number) : Usuario;

    updateUser(id : number, dados): Usuario;

    adicionarResultado(resultado: ResultadoBusca): Usuario;

    obterHistorico(idSser: number): Historico;
    
    limparHistorico(idUser: number): Historico;
}