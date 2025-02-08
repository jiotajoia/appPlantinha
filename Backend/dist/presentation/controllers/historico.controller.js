export class HistoricoController {
    limparHistoricoUseCase;
    obterHistoricoUseCase;
    constructor(limparHistoricoUseCase, obterHistoricoUseCase) {
        this.limparHistoricoUseCase = limparHistoricoUseCase;
        this.obterHistoricoUseCase = obterHistoricoUseCase;
    }
    obterHistorico = async (req, res) => {
        try {
            const id = req.params.id;
            res.status(200).json(this.obterHistoricoUseCase.execute({ idUser: id }));
        }
        catch (error) {
            res.status(404).json({
                message: "Histórico não encontrado.",
                error: error.message,
            });
        }
    };
    limparHistorico = async (req, res) => {
        try {
            const id = req.params.id;
            res.status(200).json(this.limparHistoricoUseCase.execute({ idUser: id }));
        }
        catch (error) {
            res.status(404).json({
                message: "Erro ao limpar histórico.",
                error: error.message,
            });
        }
    };
}
