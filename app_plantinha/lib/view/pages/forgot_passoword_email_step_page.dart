import 'package:app_plantinha/controllers/provider/forgot_password_state.provider.dart';
import 'package:app_plantinha/controllers/provider/step_forgot_password_state.provider.dart';
import 'package:app_plantinha/controllers/services/auth_service.model.dart';
import 'package:app_plantinha/view/widgets/container_with_button.widget.dart';
import 'package:app_plantinha/view/widgets/container_with_form.widget.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class ForgotPassowordEmailStepPage extends StatefulWidget {
  const ForgotPassowordEmailStepPage({super.key});

  @override
  State<ForgotPassowordEmailStepPage> createState() =>
      _ForgotPassowordEmailStepPageState();
}

class _ForgotPassowordEmailStepPageState extends State<ForgotPassowordEmailStepPage> {
  final emailController = TextEditingController();
  final _form = GlobalKey<FormState>();
  final AuthService auth = AuthService();

  @override
  Widget build(BuildContext context) {
    final forgotPasswordState = Provider.of<ForgotPasswordState>(context);
    final stepForgotPasswordState = Provider.of<StepForgotPasswordState>(context);
    double heightScreen = MediaQuery.of(context).size.height;
    double widthScreen = MediaQuery.of(context).size.width;

    return Column(
      children: [
        Row(
          children: [
            Container(
              width: widthScreen * 0.69,
              height: heightScreen * 0.06,
              margin: EdgeInsets.only(top: heightScreen * 0.07, bottom: heightScreen * 0.06, left: widthScreen * 0.08),
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
          padding: EdgeInsets.only(right: widthScreen * 0.04),
          child: Text(
            'E-mail cadastrado',
            style: TextStyle(fontSize: 16),
          ),
        ),
        ContainerWithForm(
          widthAdjusted: widthScreen * 0.77,
          heightAdjusted: heightScreen * 0.08,
          textHintForm: 'Digite o e-mail cadastrado...',
          controllerForm: emailController,
          keyForm: _form,
          width: widthScreen * 0.77,
          height: heightScreen * 0.08,
          marginTop:heightScreen * 0.02,
          paddingLeft: widthScreen * 0.04,
          marginBottom: heightScreen * 0.03,
          fontSizeForm: 16,
          fontSizeHint: 12,
        ),
        Row(
          children: [
            Spacer(
              flex: 3,
            ),
            ContainerWithButton(
              widthAdjusted: widthScreen * 0.34,
              heightAdjusted: heightScreen * 0.08,
              onPressed: () async{
                try{
                  await auth.enviarCodigo(emailController.text);
                  forgotPasswordState.updateEmail(emailController.text);
                  stepForgotPasswordState.incrementCurrentStep();
                }catch(e){
                  // ignore: use_build_context_synchronously
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(content: Text('Erro: $e'))
                  );
                }
              },
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
