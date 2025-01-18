import { Request, Response } from "express";
import { ImagemLogic } from "../../aplication/Imagem_logic";

export class ImagemController{
    constructor(private imagemLogic: ImagemLogic){}

    public reconhecimento = async (req: Request, res: Response) => {
        let idUser = Number(req.params.id);
        let imagem = req.body;
        res.status(201).json(await this.imagemLogic.reconhecimento(idUser, imagem));
    }
}