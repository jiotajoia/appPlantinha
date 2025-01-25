import { Usuario } from "../../domain/entities/usuario.entity";
import { UserGateway } from "../../domain/gateways/user.gateway";
import { UseCase } from "../usecase";

export type AlterarUsuarioInputDto = {
    id: string;
    novoNome?: string;
    novoSenha?: string;
    confirmaSenha?: string;
}

export type AlterarUsuarioOutputDto = {
    usuario: {
        id: string;
        nome: string;
        email: string;
        senha: string;
        historico:{
            id: string;
            dataBusca: string;
            tipoBusca: string;
            plantas:{
                id: string;
                nome: string;
                nomeCientifico: string;
                imagem: string;
                descricao: string;
                nivelDeCuidado: string;
                usoMedico: string;
                luminosidade: string;
            }[];
        }[];
    };
};


export class AlterarUsuarioUseCase implements UseCase<AlterarUsuarioInputDto, AlterarUsuarioOutputDto>{
    constructor(private readonly userGateway: UserGateway){}

    public create(userGateway: UserGateway){
        return new AlterarUsuarioUseCase(userGateway);
    }



    async execute({id, novoNome, novoSenha, confirmaSenha}: AlterarUsuarioInputDto): Promise<AlterarUsuarioOutputDto>{
        if (novoSenha && confirmaSenha && novoSenha !== confirmaSenha) {
            throw new Error("As senhas não conferem.");
        }

        const usuarioAtualizado: Usuario = await this.userGateway.updateUser({id, novoNome, novoSenha, confirmaSenha});
        const output = this.presentOutput(usuarioAtualizado);
        return output;
    }

    private presentOutput(usuario: Usuario): AlterarUsuarioOutputDto {
        return {
            usuario: {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email,
                senha: usuario.senha,
                historico: usuario.historico.map((resultado) => ({
                    id: resultado.id,
                    dataBusca: resultado.dataBusca,
                    tipoBusca: resultado.tipoBusca,
                    plantas: resultado.plantas.map((planta) => ({
                        id: planta.id,
                        nome: planta.nome,
                        nomeCientifico: planta.nomeCientifico,
                        imagem: planta.imagem,
                        descricao: planta.descricao,
                        nivelDeCuidado: planta.nivelDeCuidado,
                        usoMedico: planta.usoMedico,
                        luminosidade: planta.luminosidade,
                    })),
                })),
            },
        };
    }
    
    
}