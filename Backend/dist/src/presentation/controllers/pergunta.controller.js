export class PerguntaController {
    ObterPerguntaUseCase;
    constructor(ObterPerguntaUseCase) {
        this.ObterPerguntaUseCase = ObterPerguntaUseCase;
    }
    obterPergunta = async (req, res) => {
        const id = req.params.idPergunta;
        try {
            res.status(200).json(this.ObterPerguntaUseCase.execute({ id }));
        }
        catch (error) {
            res.status(404).json({
                message: "Erro ao obter pergunta.",
                error: error.message,
            });
        }
    };
}
