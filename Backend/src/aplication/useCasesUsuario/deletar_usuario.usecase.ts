import { Usuario } from "../../domain/entities/usuario.entity";
import { UserGateway } from "../../domain/gateways/user.gateway";
import { UseCase } from "../usecase";

export type DeletarUsuarioInputDto = {
    id: string;
}

export type DeletarUsuarioOutputDto = {
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


export class DeletarUsuarioUseCase implements UseCase<DeletarUsuarioInputDto, DeletarUsuarioOutputDto>{
    constructor(private readonly userGateway: UserGateway){}

    public create(userGateway: UserGateway){
        return new DeletarUsuarioUseCase(userGateway);
    }



    async execute({id}: DeletarUsuarioInputDto): Promise<DeletarUsuarioOutputDto>{
        const usuario = await this.userGateway.deleteUser({id});
        const output = this.presentOutput(usuario);
        return output;
    }

    private presentOutput(usuario: Usuario): DeletarUsuarioOutputDto {
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