import { Request, Response } from "express";
import { ImagemLogic } from "../../aplication/Imagem_logic";
import { ReconhecimentoCommand } from "../../aplication/useCasesImagem/reconhecimento.command";

export class ImagemController{
    constructor(private reconhecimentoCommand: ReconhecimentoCommand){}

    public reconhecimento = async (req: Request, res: Response) => {
        let idUser = Number(req.params.id);
        let imagem = req.body;
        res.status(201).json(await this.reconhecimentoCommand.execute(idUser, imagem));
    }
}