import { Request, Response } from "express";
import { CriarUsuarioUseCase } from "../../aplication/useCasesUsuario/criar_usuario.usecase";
import { ObterUsuarioUseCase } from "../../aplication/useCasesUsuario/obter_usuario.usecase";
import { DeletarUsuarioUseCase } from "../../aplication/useCasesUsuario/deletar_usuario.usecase";
import { AlterarNomeUsuarioUseCase } from "../../aplication/useCasesUsuario/alterar_nome_usuario.usecase";
import { AlterarSenhaUsuarioUseCase } from "../../aplication/useCasesUsuario/alterar_senha_usuario.usecase";

export class UsuarioController{
    constructor(private criarUsuarioUseCase: CriarUsuarioUseCase, private obterUsuarioUseCase: ObterUsuarioUseCase, private deletarUsuarioUseCase: DeletarUsuarioUseCase, private alterarNomeUsuarioUseCase: AlterarNomeUsuarioUseCase,private alterarSenhaUsuarioUseCase: AlterarSenhaUsuarioUseCase){}

    public criarUsuario = async(req: Request, res: Response) => {
        try{
            const {nome, email, senha, confirmacaoSenha} = req.body;

            if ( !email || !senha || !confirmacaoSenha) {
                res.status(400).json({error:"As senhas e email não podem estar vazias"});
            }

            const regex = new RegExp("^(?=.*[A-Z])(?=.*\\d)(?=.*[!@#\\$&*~]).{8,}$");

            if (!regex.test(senha)) {
                res.status(400).json({error:"A senha deve conter no mínimo 8 caracteres, uma letra maiúscula, um número e um caractere especial.",});
            }

            if (senha !== confirmacaoSenha) {
                res.status(400).json({ error: "As senhas não conferem." });
            }

            await this.criarUsuarioUseCase.execute({nome, email, senha});
            res.status(201).json({message: "Usuário criado com sucesso"});

        }catch(error: any){
            res.status(500).json({
                message: "Erro ao criar usuário.",
                error: error.message,
            });
        }
    }

    public obterUsuario = async (req: Request, res: Response) => {
        try{
            const {idToken} = req.body;
            res.status(200).json({message: "Usuário obtido com sucesso", data: await this.obterUsuarioUseCase.execute({idToken})});
        }catch(error: any){
            res.status(404).json({
                message: "Erro ao obter usuário.",
                error: error.message,
            });
        }
    }

    public deletarUsuario = async (req: Request, res: Response) => {
        try{
            const id = req.params.id;
            await this.deletarUsuarioUseCase.execute({id});
            
            res.status(200).json({message: "Usuário deletado com sucesso"});
        }catch(error: any){
            res.status(500).json({
                message: "Erro ao deletar usuário.",
                error: error.message,
            });
        }
    }

    public alterarNomeUsuario = async(req: Request, res: Response ) => {
        try{
            const id = req.params.id;
            const {novoNome} = req.body;
            res.status(200).json({message: "Usuário atualizado com sucesso",data: await this.alterarNomeUsuarioUseCase.execute({id, novoNome})});
        }catch(error: any){
            res.status(500).json({
                message: "Erro ao alterar nome usuário.",
                error: error.message,
            });
        }
    }

    public alterarSenhaUsuario = async(req: Request, res: Response ) => {
        try{
            const id = req.params.id;
            const {novoSenha, confirmaSenha} = req.body;

            if ( !novoSenha || !confirmaSenha) {
              res.status(400).json({error:"As senhas não podem estar vazias"});
            }
        
            const regex = new RegExp("^(?=.*[A-Z])(?=.*\\d)(?=.*[!@#\\$&*~]).{8,}$");
        
            if (!regex.test(novoSenha)) {
              res.status(400).json({error:"A senha deve conter no mínimo 8 caracteres, uma letra maiúscula, um número e um caractere especial.",});
            }
        
            if (novoSenha !== confirmaSenha) {
              res.status(400).json({ error: "As senhas não conferem." });
            }

            res.status(200).json({message: "Usuário atualizado com sucesso",data: await this.alterarSenhaUsuarioUseCase.execute({id, novoSenha, confirmaSenha})});
        }catch(error: any){
            res.status(500).json({
                message: "Erro ao alterar senha usuário.",
                error: error.message,
            });
        }
    }
}