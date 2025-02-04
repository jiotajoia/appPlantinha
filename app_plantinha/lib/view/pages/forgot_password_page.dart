import 'package:app_plantinha/configs/app.configs.dart';
import 'package:app_plantinha/view/pages/forgot_passoword_email_step_page.dart';
import 'package:app_plantinha/view/pages/forgot_password_update_step.dart';
import 'package:app_plantinha/view/pages/forgot_password_verification_code_step_page.dart';
import 'package:app_plantinha/controllers/provider/step_forgot_password_state.provider.dart';
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
    double heightScreen = MediaQuery.of(context).size.height;
    double widthScreen = MediaQuery.of(context).size.width;

    return Scaffold(
      body: Padding(
        padding: EdgeInsets.only(top: heightScreen * 0.22),
        child: Center(
          child: Column(
            children: [
              // Cabeçalho
              Row(
                mainAxisSize: MainAxisSize.max,
                children: [
                  Container(
                    padding: const EdgeInsets.only(top: 0.007),
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
                    margin: EdgeInsets.only(bottom: heightScreen * 0.01, right: widthScreen * 0.02),
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
