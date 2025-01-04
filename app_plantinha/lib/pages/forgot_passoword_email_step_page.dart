import 'package:app_plantinha/provider/forgot_password_state.provider.dart';
import 'package:app_plantinha/provider/step_forgot_password_state.provider.dart';
import 'package:app_plantinha/widgets/container_with_button.widget.dart';
import 'package:app_plantinha/widgets/container_with_form.widget.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class ForgotPassowordEmailStepPage extends StatefulWidget {
  const ForgotPassowordEmailStepPage({super.key});

  @override
  State<ForgotPassowordEmailStepPage> createState() => _ForgotPassowordEmailStepPageState();
}

class _ForgotPassowordEmailStepPageState extends State<ForgotPassowordEmailStepPage> {
  final emailController = TextEditingController();
  final _form = GlobalKey<FormState>();
  
  @override
  Widget build(BuildContext context) {
    final forgotPasswordState = Provider.of<ForgotPasswordState>(context);
    final stepForgotPasswordState = Provider.of<StepForgotPasswordState>(context);

    return Column(
      children: [
        Row(
                children: [
                  Container(
                    width: 286,
                    height: 45,
                    margin: EdgeInsets.only(top: 50, bottom: 48, left: 34),
                    child: Text(
                      'Por favor, informe seu email para recebimento do código de verificação',
                      style: TextStyle(
                        fontSize: 16,
                      ),
                    ),
                  ),
                ],
              ),
              Padding(
                padding: const EdgeInsets.only(right: 18),
                child: Text(
                  'E-mail cadastrado',
                  style: TextStyle(fontSize: 16),
                ),
              ),
              ContainerWithForm(
                textHintForm: 'Digite o e-mail cadastrado...',
                valor: emailController,
                keyForm: _form,
                width: 315,
                height: 56,
                marginTop: 18,
                paddingFormLeft: 15,
                marginBottom: 23,
              ),
              Row(
                children: [
                  Spacer(
                    flex: 3,
                  ),
                  ContainerWithButton(
                    widthAdjusted: 160, 
                    heightAdjusted: 70,
                    onPressed: () {
                      forgotPasswordState.updateEmail(emailController.text);
                      stepForgotPasswordState.incrementCurrentStep();
                    },
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
