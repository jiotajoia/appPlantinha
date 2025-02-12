export class ResultadoBuscaController {
    criarResultadoUseCase;
    criarResultadoMapaUseCase;
    obterResultadoUseCase;
    deletarResultadoUseCase;
    constructor(criarResultadoUseCase, criarResultadoMapaUseCase, obterResultadoUseCase, deletarResultadoUseCase) {
        this.criarResultadoUseCase = criarResultadoUseCase;
        this.criarResultadoMapaUseCase = criarResultadoMapaUseCase;
        this.obterResultadoUseCase = obterResultadoUseCase;
        this.deletarResultadoUseCase = deletarResultadoUseCase;
    }
    criarResultQuiz = async (req, res) => {
        try {
            let idUser = req.params.idUser;
            let respostas = req.body;
            res.status(200).json(await this.criarResultadoUseCase.execute({ idUser, respostas }));
        }
        catch (error) {
            res.status(500).json({
                message: "Erro ao criar resultado quiz.",
                error: error.message,
            });
        }
    };
    criarResultMapa = async (req, res) => {
        try {
            let pais = req.params.pais;
            res.status(200).json(await this.criarResultadoMapaUseCase.execute({ pais }));
        }
        catch (error) {
            res.status(500).json({
                message: "Erro ao criar resultado mapa.",
                error: error.message,
            });
        }
    };
    obterResult = async (req, res) => {
        try {
            let idUser = req.params.idUser;
            let idResultado = req.params.idResultado;
            res.status(200).json(this.obterResultadoUseCase.execute({ idUser, idResultado }));
        }
        catch (error) {
            res.status(404).json({
                message: "Erro ao obter resultado.",
                error: error.message,
            });
        }
    };
    deletarResult = async (req, res) => {
        try {
            let idUser = req.params.idUser;
            let idResultado = req.params.idResultado;
            res.status(200).json(await this.deletarResultadoUseCase.execute({ idUser, idResultado }));
        }
        catch (error) {
            res.status(500).json({
                message: "Erro ao deletar resultado.",
                error: error.message,
            });
        }
    };
}
