export class UsuarioController {
    criarUsuarioUseCase;
    obterUsuarioUseCase;
    deletarUsuarioUseCase;
    alterarNomeUsuarioUseCase;
    alterarSenhaUsuarioUseCase;
    constructor(criarUsuarioUseCase, obterUsuarioUseCase, deletarUsuarioUseCase, alterarNomeUsuarioUseCase, alterarSenhaUsuarioUseCase) {
        this.criarUsuarioUseCase = criarUsuarioUseCase;
        this.obterUsuarioUseCase = obterUsuarioUseCase;
        this.deletarUsuarioUseCase = deletarUsuarioUseCase;
        this.alterarNomeUsuarioUseCase = alterarNomeUsuarioUseCase;
        this.alterarSenhaUsuarioUseCase = alterarSenhaUsuarioUseCase;
    }
    criarUsuario = async (req, res) => {
        try {
            const { nome, email, senha, confirmacaoSenha } = req.body;
            if (!email || !senha || !confirmacaoSenha) {
                res.status(400).json({ error: "As senhas e email não podem estar vazias" });
            }
            const regex = new RegExp("^(?=.*[A-Z])(?=.*\\d)(?=.*[!@#\\$&*~]).{8,}$");
            if (!regex.test(senha)) {
                res.status(400).json({ error: "A senha deve conter no mínimo 8 caracteres, uma letra maiúscula, um número e um caractere especial.", });
            }
            if (senha !== confirmacaoSenha) {
                res.status(400).json({ error: "As senhas não conferem." });
            }
            await this.criarUsuarioUseCase.execute({ nome, email, senha });
            res.status(201).json({ message: "Usuário criado com sucesso" });
        }
        catch (error) {
            res.status(500).json({
                message: "Erro ao criar usuário.",
                error: error.message,
            });
        }
    };
    obterUsuario = async (req, res) => {
        try {
            const { idToken } = req.body;
            res.status(200).json({ message: "Usuário obtido com sucesso", data: await this.obterUsuarioUseCase.execute({ idToken }) });
        }
        catch (error) {
            res.status(404).json({
                message: "Erro ao obter usuário.",
                error: error.message,
            });
        }
    };
    deletarUsuario = async (req, res) => {
        try {
            const id = req.params.id;
            await this.deletarUsuarioUseCase.execute({ id });
            res.status(200).json({ message: "Usuário deletado com sucesso" });
        }
        catch (error) {
            res.status(500).json({
                message: "Erro ao deletar usuário.",
                error: error.message,
            });
        }
    };
    alterarNomeUsuario = async (req, res) => {
        try {
            const id = req.params.id;
            const { novoNome } = req.body;
            res.status(200).json({ message: "Usuário atualizado com sucesso", data: await this.alterarNomeUsuarioUseCase.execute({ id, novoNome }) });
        }
        catch (error) {
            res.status(500).json({
                message: "Erro ao alterar nome usuário.",
                error: error.message,
            });
        }
    };
    alterarSenhaUsuario = async (req, res) => {
        try {
            const id = req.params.id;
            const { novoSenha, confirmaSenha } = req.body;
            if (!novoSenha || !confirmaSenha) {
                res.status(400).json({ error: "As senhas não podem estar vazias" });
            }
            const regex = new RegExp("^(?=.*[A-Z])(?=.*\\d)(?=.*[!@#\\$&*~]).{8,}$");
            if (!regex.test(novoSenha)) {
                res.status(400).json({ error: "A senha deve conter no mínimo 8 caracteres, uma letra maiúscula, um número e um caractere especial.", });
            }
            if (novoSenha !== confirmaSenha) {
                res.status(400).json({ error: "As senhas não conferem." });
            }
            res.status(200).json({ message: "Usuário atualizado com sucesso", data: await this.alterarSenhaUsuarioUseCase.execute({ id, novoSenha, confirmaSenha }) });
        }
        catch (error) {
            res.status(500).json({
                message: "Erro ao alterar senha usuário.",
                error: error.message,
            });
        }
    };
}
