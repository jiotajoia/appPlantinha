export class ImagemController {
    reconhecimentoUseCase;
    constructor(reconhecimentoUseCase) {
        this.reconhecimentoUseCase = reconhecimentoUseCase;
    }
    reconhecimento = async (req, res) => {
        let idUser = req.params.id;
        let { nomePlantas } = req.body;
        res.status(200).json(await this.reconhecimentoUseCase.execute({ idUser, nomePlantas }));
    };
}
