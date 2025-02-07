export {};
/*export class ReconhecimentoUseCase implements UseCase<ReconhecimentoInputDto, ReconhecimentoOutputDto>{
    constructor(private resultGateway: ResultadoGateway, private userGateway: UserGateway){}

    public create(resultGateway: ResultadoGateway, userGateway: UserGateway): ReconhecimentoUseCase{
        return new ReconhecimentoUseCase(resultGateway, userGateway);
    }

    async execute({idUser, imagem} :ReconhecimentoInputDto): Promise<ReconhecimentoOutputDto>{
        let plantas = {};
        let resultado = await this.resultGateway.criarResultado({plantas,tipo: 'imagem'});
        this.userGateway.adicionarResultado(resultado);

        const output = this.presentOutput(resultado);
        return output;
    }

    private presentOutput(resultado: ResultadoBusca): ReconhecimentoOutputDto{
        return {
            id: resultado.id,
            dataBusca: resultado.dataBusca,
            tipoBusca: resultado.tipoBusca,
            plantas: resultado.plantas.map(planta => ({
                id: planta.id,
                nome: planta.nome,
                nomeCientifico: planta.nomeCientifico,
                imagem: planta.imagem,
                descricao: planta.descricao,
                nivelDeCuidado: planta.nivelDeCuidado,
                usoMedico: planta.usoMedico,
                luminosidade: planta.luminosidade
            }))
        }
    }
}*/ 
