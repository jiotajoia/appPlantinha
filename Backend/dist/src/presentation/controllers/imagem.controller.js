//import { ReconhecimentoUseCase } from "../../aplication/useCasesImagem/reconhecimento.usecase.js";
export class ImagemController {
    //constructor(private reconhecimentoUseCase: ReconhecimentoUseCase){}
    reconhecimento = async (req, res) => {
        let idUser = req.params.id;
        let imagem = req.body;
        //res.status(201).json(await this.reconhecimentoUseCase.execute({idUser, imagem}));
    };
}
