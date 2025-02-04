export class ReconhecimentoUseCase {
    resultGateway;
    userGateway;
    constructor(resultGateway, userGateway) {
        this.resultGateway = resultGateway;
        this.userGateway = userGateway;
    }
    create(resultGateway, userGateway) {
        return new ReconhecimentoUseCase(resultGateway, userGateway);
    }
    async execute({ idUser, imagem }) {
        let plantas = {};
        let resultado = await this.resultGateway.criarResultado({ plantas, tipo: 'imagem' });
        this.userGateway.adicionarResultado(resultado);
        const output = this.presentOutput(resultado);
        return output;
    }
    presentOutput(resultado) {
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
        };
    }
}
