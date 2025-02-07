import { Request, Response } from "express";
import { ReconhecimentoUseCase } from "../../aplication/useCasesImagem/reconhecimento.usecase";

export class ImagemController{
    constructor(private reconhecimentoUseCase: ReconhecimentoUseCase){}

    public reconhecimento = async (req: Request, res: Response) => {
        let idUser = req.params.id;
        let imagem = req.body;
        res.status(200).json(await this.reconhecimentoUseCase.execute({idUser, imagem}));
    }
}