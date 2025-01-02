import 'package:app_plantinha/configs/app.configs.dart';
import 'package:app_plantinha/widgets/container_with_button.widget.dart';
import 'package:app_plantinha/widgets/container_with_form.widget.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class ForgotPasswordPage extends StatefulWidget {
  const ForgotPasswordPage({super.key, required this.title});
  final String title;

  @override
  State<ForgotPasswordPage> createState() => _ForgotPasswordPageState();
}

class _ForgotPasswordPageState extends State<ForgotPasswordPage> {
  final _valor = TextEditingController();
  final _form = GlobalKey<FormState>();
  int _currentStep = 0;
  String _email = '';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Padding(
        padding: const EdgeInsets.only(top: 159),
        child: Center(
          child: Column(
            children: [
              // Cabeçalho
              Row(
                mainAxisSize: MainAxisSize.max,
                children: [
                  Container(
                    padding: const EdgeInsets.only(top: 5),
                    child: IconButton(
                      onPressed: () {
                        AppConfigs.saveLastRoute('/');
                        context.pop();
                      },
                      icon: const Icon(
                        Icons.arrow_back,
                        size: 24,
                      ),
                    ),
                  ),
                  const Text(
                    'Esqueci a Senha',
                    style: TextStyle(
                      fontSize: 24,
                    ),
                  ),
                  const Spacer(),
                  Container(
                    margin: const EdgeInsets.only(bottom: 10, right: 10),
                    width: 59,
                    height: 59,
                    child: ClipOval(child: Image.asset('lib/images/logo.png')),
                  ),
                ],
              ),

              // Conteúdo da página (varia conforme _currentStep)
              Expanded(
                child: _buildStepContent(),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildStepContent() {
    switch (_currentStep) {
      case 0:
        return _buildEmailStep();
      case 1:
        return _buildVerificationCodeStep();
      case 2:
        return _buildNewPasswordStep();
      default:
        return const SizedBox.shrink();
    }
  }

  Widget _buildEmailStep() {
    return Column(
      children: [
        const Padding(
          padding: EdgeInsets.symmetric(horizontal: 34, vertical: 16),
          child: Text(
            'Por favor, informe seu email para recebimento do código de verificação',
            style: TextStyle(fontSize: 16),
            textAlign: TextAlign.center,
          ),
        ),
        const Text(
          'E-mail cadastrado',
          style: TextStyle(fontSize: 16),
        ),
        ContainerWithForm(
          textHintForm: 'Digite o e-mail cadastrado...',
          valor: _valor,
          keyForm: _form,
          width: 315,
          height: 56,
          marginTop: 18,
          paddingFormLeft: 15,
          marginBottom: 23,
        ),
        Row(
          children: [
            const Spacer(),
            ContainerWithButton(
              onPressed: () {
                setState(() {
                  _email = _valor.text; // Salva o email para exibir na próxima etapa
                  _currentStep = 1;
                  _valor.text = ''; // Avança para a próxima etapa
                });
              },
              labelText: 'Enviar',
              width: 139,
              height: 58,
            ),
            const Spacer(),
          ],
        ),
      ],
    );
  }

  Widget _buildVerificationCodeStep() {
    return Column(
      children: [
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 34, vertical: 16),
          child: Text(
            'Insira o código de verificação enviado para o e-mail ${_obfuscateEmail(_email)}',
            style: const TextStyle(fontSize: 16),
            textAlign: TextAlign.center,
          ),
        ),
        const Text(
          'Código de verificação',
          style: TextStyle(fontSize: 16),
        ),
        ContainerWithForm(
          textHintForm: 'Digite o código de verificação...',
          valor: _valor,
          keyForm: _form,
          width: 315,
          height: 56,
          marginTop: 18,
          paddingFormLeft: 15,
          marginBottom: 23,
        ),
        Row(
          children: [
            const Spacer(),
            ContainerWithButton(
              onPressed: () {
                setState(() {
                  _currentStep = 2; // Avança para a etapa final
                });
              },
              labelText: 'Verificar',
              width: 139,
              height: 58,
            ),
            const Spacer(),
          ],
        ),
      ],
    );
  }

  Widget _buildNewPasswordStep() {
    return Column(
      children: [
        const Padding(
          padding: EdgeInsets.symmetric(horizontal: 34, vertical: 16),
          child: Text(
            'Crie uma nova senha para sua conta',
            style: TextStyle(fontSize: 16),
            textAlign: TextAlign.center,
          ),
        ),
        const Text(
          'Nova senha',
          style: TextStyle(fontSize: 16),
        ),
        ContainerWithForm(
          textHintForm: 'Digite sua nova senha...',
          valor: _valor,
          keyForm: _form,
          width: 315,
          height: 56,
          marginTop: 18,
          paddingFormLeft: 15,
          marginBottom: 16,
        ),
        const Text(
          'Confirme sua senha',
          style: TextStyle(fontSize: 16),
        ),
        ContainerWithForm(
          textHintForm: 'Confirme sua nova senha...',
          valor: _valor,
          keyForm: _form,
          width: 315,
          height: 56,
          marginTop: 18,
          paddingFormLeft: 15,
          marginBottom: 23,
        ),
        Row(
          children: [
            const Spacer(),
            ContainerWithButton(
              onPressed: () {
                // Lógica para salvar a nova senha
              },
              labelText: 'Enviar',
              width: 139,
              height: 58,
            ),
            const Spacer(),
          ],
        ),
      ],
    );
  }

  String _obfuscateEmail(String email) {
    if (email.isEmpty) return '';
    final parts = email.split('@');
    final obfuscated = parts[0].replaceRange(1, parts[0].length - 1, '*' * (parts[0].length - 2));
    return '$obfuscated@${parts[1]}';
  }
}
