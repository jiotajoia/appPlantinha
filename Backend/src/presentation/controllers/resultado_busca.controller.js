export class ResultadoBuscaController {
    criarResultadoUseCase;
    obterResultadoUseCase;
    deletarResultadoUseCase;

    constructor(criarResultadoUseCase, obterResultadoUseCase, deletarResultadoUseCase) {
        this.criarResultadoUseCase = criarResultadoUseCase;
        this.obterResultadoUseCase = obterResultadoUseCase;
        this.deletarResultadoUseCase = deletarResultadoUseCase;
    }

    criarResult = async (req, res) => {
        try {
            let idUser = req.params.idUser;
            let idResultado = req.params.idResultado;
            let respostas = req.body;
            res.status(200).json(this.preencherResultadoUseCase.execute({ idUser, respostas }));
        }
        catch (error) {
            res.status(500).json({
                message: "Erro ao criar resultado.",
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
            res.status(200).json(this.deletarResultadoUseCase.execute({ idUser, idResultado }));
        }
        catch (error) {
            res.status(500).json({
                message: "Erro ao deletar resultado.",
                error: error.message,
            });
        }
    };
}
