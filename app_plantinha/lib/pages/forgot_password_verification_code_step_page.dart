import 'package:app_plantinha/provider/forgot_password_state.provider.dart';
import 'package:app_plantinha/provider/step_forgot_password_state.provider.dart';
import 'package:app_plantinha/widgets/container_with_button.widget.dart';
import 'package:app_plantinha/widgets/container_with_form.widget.dart';
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

  String _obfuscateEmail(String email) {
    if (email.isEmpty) return '';
    final parts = email.split('@');
    final obfuscated = parts[0]
        .replaceRange(1, parts[0].length - 1, '*' * (parts[0].length - 2));
    return '$obfuscated@${parts[1]}';
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Row(
          children: [
            Container(
                width: 334,
                height: 45,
                margin: EdgeInsets.only(top: 50, bottom: 48, left: 34),
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
          padding: const EdgeInsets.only(right: 18),
          child: Text(
            'Código de verificação',
            style: TextStyle(fontSize: 16),
          ),
        ),
        ContainerWithForm(
          widthAdjusted: 315,
          heightAdjusted: 56,
          textHintForm: 'Digite o código de verificação',
          controllerForm: verificationCodeController,
          keyForm: _form,
          width: 315,
          height: 56,
          marginTop: 18,
          paddingLeft: 15,
          marginBottom: 23,
          fontSizeForm: 16,
          fontSizeHint: 12,
        ),
        Row(
          children: [
            Spacer(
              flex: 3,
            ),
            ContainerWithButton(
              onPressed: () {
                Provider.of<StepForgotPasswordState>(context, listen: false).incrementCurrentStep();
              },
              widthAdjusted: 139, 
              heightAdjusted: 58,
              labelText: 'Enviar',
              width: 139,
              height: 58,
            ),
            Spacer(),
          ],
        )
      ],
    );
  }
}
