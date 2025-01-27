import 'package:app_plantinha/controler/provider/step_forgot_password_state.provider.dart';
import 'package:app_plantinha/view/widgets/container_with_button.widget.dart';
import 'package:app_plantinha/view/widgets/container_with_form.widget.dart';
import 'package:app_plantinha/view/widgets/row_with_text.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';

class ForgotPasswordUpdateStep extends StatefulWidget {
  const ForgotPasswordUpdateStep({super.key});

  @override
  State<ForgotPasswordUpdateStep> createState() => _ForgotPasswordUpdateStepState();
}

class _ForgotPasswordUpdateStepState extends State<ForgotPasswordUpdateStep> {
  static final List<Map<String, dynamic>> valuesItems = [
    {'label': 'Nova senha', 'form': GlobalKey<FormState>(), 'valor': TextEditingController()},
    {'label': 'Confirmar a nova senha', 'form': GlobalKey<FormState>(), 'valor': TextEditingController()},
  ];

  @override
  Widget build(BuildContext context) {
    double heightScreen = MediaQuery.of(context).size.height;
    double widthScreen = MediaQuery.of(context).size.width;
    final stepForgotPasswordState = Provider.of<StepForgotPasswordState>(context);

    return Padding(
      padding: EdgeInsets.symmetric(horizontal: widthScreen * 0.039),
      child: Column(
        mainAxisSize: MainAxisSize.min, // Apenas o espaço necessário.
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Título
          Container(
            width: double.infinity,
            margin: EdgeInsets.only(top: heightScreen * 0.068),
            child: const Text(
              'Insira a nova senha:',
              style: TextStyle(fontSize: 16),
            ),
          ),
          // Campos do formulário
          ...valuesItems.map((data) {
            return Padding(
              padding: EdgeInsets.only(top: heightScreen * 0.02),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  RowWithText(
                    textLabel: data['label'],
                    fontSize: 14,
                    marginBottom: heightScreen * 0.013,
                  ),
                  ContainerWithForm(
                    fontSizeForm: 16,
                    fontSizeHint: 12,
                    widthAdjusted: widthScreen * 0.76,
                    heightAdjusted: heightScreen * 0.064,
                    controllerForm: data['valor'],
                    keyForm: data['form'],
                    width: widthScreen * 0.76, // Usa todo o espaço disponível.
                    height: heightScreen * 0.064,
                    paddingLeft: widthScreen * 0.036,
                    marginBottom: heightScreen * 0.034,
                  ),
                ],
              ),
            );
          }),
          // Botão de Alteração
          Align(
            alignment: Alignment.centerRight,
            child: ContainerWithButton(
              onPressed: () {
                stepForgotPasswordState.resetCurrentStep();
                context.go('/');
              },
              widthAdjusted: 139,
              heightAdjusted: 58,
              labelText: 'Alterar',
              width: 139,
              height: 58,
              marginTop: 31,
            ),
          ),
        ],
      ),
    );
  }
}
