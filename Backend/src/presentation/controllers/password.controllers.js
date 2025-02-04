export class PasswordController {
    editarSenhaUseCases;
    verifyCodeUseCases;
    sendCodeUseCases;
    constructor(editarSenhaUseCases, verifyCodeUseCases, sendCodeUseCases) {
        this.editarSenhaUseCases = editarSenhaUseCases;
        this.verifyCodeUseCases = verifyCodeUseCases;
        this.sendCodeUseCases = sendCodeUseCases;
    }
    resetPassword = async (req, res) => {
        const { email, newPassword, confirmPassword } = req.body;
        if (!email || !newPassword || !confirmPassword) {
            res.status(400).json({ error: "As senhas e email não podem estar vazias" });
        }
        const regex = new RegExp("^(?=.*[A-Z])(?=.*\\d)(?=.*[!@#\\$&*~]).{8,}$");
        if (!regex.test(newPassword)) {
            res.status(400).json({ error: "A senha deve conter no mínimo 8 caracteres, uma letra maiúscula, um número e um caractere especial.", });
        }
        if (newPassword !== confirmPassword) {
            res.status(400).json({ error: "As senhas não conferem." });
        }
        try {
            await this.editarSenhaUseCases.execute(email, newPassword);
            res.status(200).json({ success: true, message: "Senha alterada com sucesso!" });
        }
        catch (error) {
            console.error("Erro ao alterar senha:", error);
            res.status(500).json({ error: "Erro ao alterar senha." });
        }
    };
    verifyCode = async (req, res) => {
        const { email, code } = req.body;
        if (!email || !code) {
            res.status(400).json({ error: "E-mail e código são obrigatórios." });
        }
        try {
            const savedCode = await this.verifyCodeUseCases.execute(email);
            if (!savedCode) {
                res.status(404).json({ error: "Código não encontrado." });
            }
            if (savedCode !== code) {
                res.status(403).json({ error: "Código inválido." });
            }
            res.status(200).json({ success: true, message: "Código verificado com sucesso!" });
        }
        catch (error) {
            console.error("Erro ao verificar código:", error);
            res
                .status(500)
                .json({ error: "Erro ao verificar código de verificação." });
        }
    };
    sendCode = async (req, res) => {
        const { email } = req.body;
        if (!email) {
            res.status(400).json({ error: "O e-mail é obrigatório." });
        }
        try {
            await this.sendCodeUseCases.execute(email);
            res.status(200).json({ success: true, message: "Código enviado com sucesso!" });
        }
        catch (error) {
            console.error("Erro ao enviar código:", error);
            res.status(500).json({ error: "Erro ao enviar código de verificação." });
        }
    };
}
