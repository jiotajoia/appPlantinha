import { ResultadoBusca } from "./resultado_busca.entity";

export class Usuario {
  idUser!: number;
  nome: string;
  email: string;
  senha: string;
  historico: ResultadoBusca[];

  constructor(nome: string, email: string, senha: string) {
    this.nome = nome;
    this.email = email;
    this.senha = senha;
    this.historico = [];
  }
}
