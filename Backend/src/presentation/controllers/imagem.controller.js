export class ImagemController {
    reconhecimentoUseCase;
    constructor(reconhecimentoUseCase) {
        this.reconhecimentoUseCase = reconhecimentoUseCase;
    }
    reconhecimento = async (req, res) => {
        let idUser = req.params.id;
        let imagem = req.body;
        res.status(201).json(await this.reconhecimentoUseCase.execute({ idUser, imagem }));
    };
}
