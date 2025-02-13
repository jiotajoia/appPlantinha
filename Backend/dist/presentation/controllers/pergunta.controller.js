export class PerguntaController {
    ObterPerguntaUseCase;
    constructor(ObterPerguntaUseCase) {
        this.ObterPerguntaUseCase = ObterPerguntaUseCase;
    }
    obterPergunta = async (req, res) => {
        const id = req.params.id;
        try {
            res.status(200).json(await this.ObterPerguntaUseCase.execute({ id }));
        }
        catch (error) {
            res.status(404).json({
                message: "Erro ao obter pergunta.",
                error: error.message,
            });
        }
    };
}
