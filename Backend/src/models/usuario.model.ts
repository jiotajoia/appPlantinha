class Usuario {
  idUser: number;
  nome: string;
  email: string;
  senha: string;
  historico: ResultadoBusca[];

  constructor(idUser: number, nome: string, email: string, senha: string, historico: ResultadoBusca[]) {
    this.idUser = idUser;
    this.nome = nome;
    this.email = email;
    this.senha = senha;
    this.historico = historico;
  }
}
