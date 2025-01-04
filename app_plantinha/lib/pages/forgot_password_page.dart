import 'package:app_plantinha/configs/app.configs.dart';
import 'package:app_plantinha/pages/forgot_passoword_email_step_page.dart';
import 'package:app_plantinha/pages/forgot_password_update_step.dart';
import 'package:app_plantinha/pages/forgot_password_verification_code_step_page.dart';
import 'package:app_plantinha/provider/step_forgot_password_state.provider.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';

class ForgotPasswordPage extends StatefulWidget {
  const ForgotPasswordPage({super.key, required this.title});
  final String title;

  @override
  State<ForgotPasswordPage> createState() => _ForgotPasswordPageState();
}

class _ForgotPasswordPageState extends State<ForgotPasswordPage> {
  @override
  Widget build(BuildContext context) {
    final stepForgotPasswordState = Provider.of<StepForgotPasswordState>(context);
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
                        stepForgotPasswordState.resetCurrentStep();
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
    switch (Provider.of<StepForgotPasswordState>(context).currentStep) {
      case 0:
        return ForgotPassowordEmailStepPage();
      case 1:
        return ForgotPasswordVerificationCodeStepPage();
      case 2:
        return ForgotPasswordUpdateStep();
      default:
        return const SizedBox.shrink();
    }
  }
}
