import { Pergunta } from "../../domain/entities/pergunta.entity";
import { PerguntaRepo } from "../../domain/repositories/pergunta_repo";

export class ObterPerguntaCommand{
    constructor(private perguntaRepo: PerguntaRepo){}

    async execute(idPergunta: number): Promise<Pergunta>{
        let pergunta = this.perguntaRepo.obterPergunta(idPergunta);
        return pergunta;
    }
}