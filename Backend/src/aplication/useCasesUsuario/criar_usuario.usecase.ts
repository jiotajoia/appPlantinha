import { Usuario } from "../../domain/entities/usuario.entity";
import { UserGateway } from "../../domain/gateways/user.gateway";
import { UseCase } from "../usecase";

export type CriarUsuarioInputDto = {
    nome: string;
    email: string;
    senha: string;
}

export type CriarUsuarioOutputDto = {
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
                luminosidade: string
            }[];
        }[];
    };
};


export class CriarUsuarioUseCase implements UseCase<CriarUsuarioInputDto, CriarUsuarioOutputDto>{
    constructor(private readonly userGateway: UserGateway){}

    public create(userGateway: UserGateway){
        return new CriarUsuarioUseCase(userGateway);
    }

    async execute({nome, email, senha}: CriarUsuarioInputDto): Promise<CriarUsuarioOutputDto>{
        const usuario = Usuario.create(nome, email, senha);
        await this.userGateway.save(usuario);

        const output = this.presentOutput(usuario);
        return output;
    }

    private presentOutput(usuario: Usuario): CriarUsuarioOutputDto {
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
                        luminosidade: planta.luminosidade
                    })),
                })),
            },
        };
    }
    
    
}