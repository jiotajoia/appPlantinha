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
        let plantas = [];
        let resultado = this.resultGateway.criarResultado({ plantas, tipo: 'imagem' });
        this.userGateway.adicionarResultado({ idUser, resultado: resultado.resultado });
        return resultado.resultado;
    }
}
