import 'package:app_plantinha/controllers/provider/forgot_password_state.provider.dart';
import 'package:app_plantinha/controllers/provider/step_forgot_password_state.provider.dart';
import 'package:app_plantinha/controllers/services/auth_service.dart';
import 'package:app_plantinha/view/widgets/container_with_button.widget.dart';
import 'package:app_plantinha/view/widgets/container_with_form.widget.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class ForgotPasswordVerificationCodeStepPage extends StatefulWidget {
  const ForgotPasswordVerificationCodeStepPage({super.key});

  @override
  State<ForgotPasswordVerificationCodeStepPage> createState() =>
      _ForgotPasswordVerificationCodeStepPageState();
}

class _ForgotPasswordVerificationCodeStepPageState extends State<ForgotPasswordVerificationCodeStepPage> {
  final verificationCodeController = TextEditingController();
  final _form = GlobalKey<FormState>();
  final AuthService auth = AuthService();

  String _obfuscateEmail(String email) {
    if (email.isEmpty) return '';
    final parts = email.split('@');
    final obfuscated = parts[0]
        .replaceRange(1, parts[0].length - 1, '*' * (parts[0].length - 2));
    return '$obfuscated@${parts[1]}';
  }

  @override
  Widget build(BuildContext context) {
    double heightScreen = MediaQuery.of(context).size.height;
    double widthScreen = MediaQuery.of(context).size.width;
    return Column(
      children: [
        Row(
          children: [
            Container(
                width: widthScreen * 0.81,
                height: heightScreen * 0.06,
                margin: EdgeInsets.only(top: heightScreen * 0.07, bottom: heightScreen * 0.06, left: widthScreen * 0.08),
                child: RichText(
                  text: TextSpan(
                    style: TextStyle(fontSize: 16),
                    children: [
                      TextSpan(
                        text:
                            'Insira o código de verificação enviado para o e-mail ',
                            style: TextStyle(color: Colors.black)
                      ),
                      TextSpan(
                        text: _obfuscateEmail(
                            Provider.of<ForgotPasswordState>(context).email),
                        style: TextStyle(
                          color: Color(0xFF8CD86B),
                          decoration: TextDecoration.underline, // Cor diferente para o e-mail
                        ),
                      ),
                    ],
                  ),
                )),
          ],
        ),
        Padding(
          padding: EdgeInsets.only(right: widthScreen * 0.04),
          child: Text(
            'Código de verificação',
            style: TextStyle(fontSize: 16),
          ),
        ),
        ContainerWithForm(
          widthAdjusted: widthScreen * 0.77,
          heightAdjusted: heightScreen * 0.08,
          textHintForm: 'Digite o código de verificação',
          controllerForm: verificationCodeController,
          keyForm: _form,
          width: widthScreen * 0.77,
          height: heightScreen * 0.08,
          marginTop:heightScreen * 0.02,
          paddingLeft: widthScreen * 0.04,
          marginBottom: heightScreen * 0.03,
          fontSizeForm: 16,
          fontSizeHint: 12,
          obscureTextForm: false,
        ),
        Row(
          children: [
            Spacer(
              flex: 3,
            ),
            ContainerWithButton(
              onPressed: () async{
                try{
                  await auth.verificarCodigo(Provider.of<ForgotPasswordState>(context).email, verificationCodeController.text);
                // ignore: use_build_context_synchronously
                  Provider.of<StepForgotPasswordState>(context, listen: false).incrementCurrentStep();
                }catch(e){
                  // ignore: use_build_context_synchronously
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(content: Text('Erro: $e'))
                  );
                }
              },
              widthAdjusted: widthScreen * 0.34,
              heightAdjusted: heightScreen * 0.08,
              labelText: 'Enviar',
              width: widthScreen * 0.34,
              height: heightScreen * 0.08,
            ),
            Spacer(),
          ],
        )
      ],
    );
  }
}
