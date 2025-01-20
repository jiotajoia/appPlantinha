import { Quiz } from "../../domain/entities/quiz.entity";
import { ResultadoBusca } from "../../domain/entities/resultado_busca.entity";
import { UseCase } from "../usecase";

export type ObterQuizInputDto = void;

export type ObterQuizOutputDto = {
    id: string;
    perguntas: {
        id: string;
        indagacao: string;
        opcoes: string[];
    }[];
    resultado: {
        id: string;
        dataBusca: string;
        tipoBusca: string;
        plantas: {
            id: string;
            nome: string;
            nomeCientifico: string;
            imagem: string;
            cuidados: string;
            curiosidades: string;
            ambiente: string;
            shadowOrLightType: string;
        }[];
    };
}

export class ObterQuizUseCase implements UseCase<ObterQuizInputDto, ObterQuizOutputDto>{
    constructor(){}

    public create(): ObterQuizUseCase{
        return new ObterQuizUseCase();
    }

    async execute(): Promise<ObterQuizOutputDto>{
        let resultado: ResultadoBusca = ResultadoBusca.create("03-09-2004", "quiz", []);
        let quiz = Quiz.create(resultado);

        let output = this.presentOutput(quiz);

        return output;
    }

    private presentOutput(quiz: Quiz): ObterQuizOutputDto{
        return {
            id: quiz.id,
            perguntas: quiz.perguntas.map((pergunta) => ({
                id: pergunta.id,
                indagacao: pergunta.indagacao,
                opcoes: pergunta.opcoes.map((opcao) => opcao)
            })),
            resultado: {
                id: quiz.resultado.id,
                dataBusca: quiz.resultado.dataBusca,
                tipoBusca: quiz.resultado.tipoBusca,
                plantas: quiz.resultado.plantas.map((planta) => ({
                    id: planta.id,
                    nome: planta.nome,
                    nomeCientifico: planta.nomeCientifico,
                    imagem: planta.imagem,
                    cuidados: planta.cuidados,
                    curiosidades: planta.curiosidades,
                    ambiente: planta.ambiente,
                    shadowOrLightType: planta.shadowOrLightType
                }))
            }
        }
    }
}