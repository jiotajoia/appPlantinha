import 'package:app_plantinha/provider/step_forgot_password_state.provider.dart';
import 'package:app_plantinha/widgets/container_with_button.widget.dart';
import 'package:app_plantinha/widgets/container_with_form.widget.dart';
import 'package:app_plantinha/widgets/row_with_text.dart';
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
    final stepForgotPasswordState = Provider.of<StepForgotPasswordState>(context);

    return SingleChildScrollView(
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 16.0),
        child: Column(
          mainAxisSize: MainAxisSize.min, // Apenas o espaço necessário.
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Título
            Container(
              width: double.infinity,
              margin: const EdgeInsets.only(top: 50),
              child: const Text(
                'Insira a nova senha:',
                style: TextStyle(fontSize: 16),
              ),
            ),
            // Campos do formulário
            ...valuesItems.map((data) {
              return Padding(
                padding: const EdgeInsets.only(top: 15),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    RowWithText(
                      textLabel: data['label'],
                      marginLeft: 0, // Ajuste conforme necessário.
                      marginTop: 0,
                      fontSize: 14,
                      marginBottom: 10,
                    ),
                    ContainerWithForm(
                      valor: data['valor'],
                      keyForm: data['form'],
                      width: double.infinity, // Usa todo o espaço disponível.
                      height: 47,
                      paddingFormBottom: 10,
                      paddingFormLeft: 15,
                      marginLeft: 0,
                      marginBottom: 25,
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
                widthAdjusted: 160,
                heightAdjusted: 70,
                labelText: 'Alterar',
                width: 139,
                height: 58,
                marginTop: 31,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
