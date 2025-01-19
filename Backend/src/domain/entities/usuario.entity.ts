import { ResultadoBusca } from "./resultado_busca.entity";

export type UserProps = {
  id: string;
  nome: string;
  email: string;
  senha: string;
  historico: ResultadoBusca[];
}

export class Usuario {
  constructor(private props: UserProps) {}

  public static create(nome: string, email: string, senha: string){
    return new Usuario({
      id: crypto.randomUUID().toString(),
      nome,
      email,
      senha,
      historico: []
    });
  }
  
  public static with(props: UserProps) {
    return new Usuario(props);
  }

  public get id(){
    return this.props.id;
  }  

  public get nome(){
    return this.props.nome;
  }

  public get email(){
    return this.props.email;
  }

  public get senha(){
    return this.props.senha;
  }

  public get historico(){
    return this.props.historico;
  }
}
