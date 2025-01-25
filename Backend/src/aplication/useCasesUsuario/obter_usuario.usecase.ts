import { Usuario } from "../../domain/entities/usuario.entity";
import { UserGateway } from "../../domain/gateways/user.gateway";
import { UseCase } from "../usecase";

export type ObterUsuarioInputDto = {
    email: string;
    senha: string;
}

export type ObterUsuarioOutputDto = {
    usuario: {
        id: string;
        nome: string;
        email: string;
        senha: string;
        historico: Array<{
            id: string;
            dataBusca: string;
            tipoBusca: string;
            plantas: {
                id: string;
                nome: string;
                nomeCientifico: string;
                imagem: string;
                descricao: string;
                nivelDeCuidado: string;
                usoMedico: string;
                luminosidade: string;
            }[];
        }>;
    };
};


export class ObterUsuarioUseCase implements UseCase<ObterUsuarioInputDto, ObterUsuarioOutputDto>{
    constructor(private readonly userGateway: UserGateway){}

    public create(userGateway: UserGateway){
        return new ObterUsuarioUseCase(userGateway);
    }



    async execute({email, senha}: ObterUsuarioInputDto): Promise<ObterUsuarioOutputDto>{
        const usuario = await this.userGateway.obterUser({email: email, senha: senha});
        const output = this.presentOutput(usuario);
        return output;
    }

    private presentOutput(usuario: Usuario): ObterUsuarioOutputDto {
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