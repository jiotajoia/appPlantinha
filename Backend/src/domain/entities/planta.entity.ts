export class Planta{
    idPlanta: number;
    nome: string;
    nomeCientifico: string;
    imagem: string;
    cuidados: string;
    curiosidades: string;
    ambiente: string;
    shadowOrLightType: string;

    constructor(idPlanta: number, shadowOrLightType: string, nome: string, nomeCientifico: string, imagem: string, cuidados: string, curiosidades: string, ambiente: string){
        this.ambiente = ambiente;
        this.curiosidades = curiosidades;
        this.idPlanta = idPlanta;
        this.nome = nome;
        this.nomeCientifico = nomeCientifico;
        this.imagem = imagem;
        this.cuidados = cuidados;
        this.shadowOrLightType = shadowOrLightType;
    }
}