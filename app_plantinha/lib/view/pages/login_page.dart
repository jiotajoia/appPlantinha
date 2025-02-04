import 'package:app_plantinha/configs/app.configs.dart';
import 'package:app_plantinha/controllers/services/auth_service.model.dart';
import 'package:app_plantinha/view/widgets/container_with_button.widget.dart';
import 'package:app_plantinha/view/widgets/container_with_form.widget.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({super.key, required this.title});
  final String title;

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final _form = GlobalKey<FormState>();
  final _form1 = GlobalKey<FormState>();
  final _valor = TextEditingController();
  final _valor1 = TextEditingController();
  final AuthService auth = AuthService();

  Future<void> logarUser(String lastRoute, String email, String password) async {
    try {
      await auth.logarUsers(email, password);
      AppConfigs.saveLastRoute(lastRoute);
      if (mounted) {
        context.go(lastRoute);
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Erro ao fazer login: $e')),
        );
      }
    }
  }

  void navigateToPage(String lastRoute) {
    AppConfigs.saveLastRoute(lastRoute);
    context.go(lastRoute);
  }

  @override
  Widget build(BuildContext context) {
    double heightScreen = MediaQuery.of(context).size.height;
    double widthScreen = MediaQuery.of(context).size.width;

    return Scaffold(
      body: Padding(
        padding: EdgeInsets.only(top: heightScreen * 0.098),
        child: Center(
          child: SingleChildScrollView(
            child: Column(
              children: [
                Container(
                  margin: EdgeInsets.only(bottom: heightScreen * 0.013),
                  width: widthScreen * 0.45,
                  height: heightScreen * 0.25,
                  child: ClipOval(child: Image.asset('lib/images/logo.png')),
                ),
                Text(
                  'E-mail',
                  style: TextStyle(
                    fontSize: 16,
                  ),
                ),
                ContainerWithForm(
                  widthAdjusted: widthScreen * 0.76,
                  heightAdjusted: heightScreen * 0.07,
                  paddingTop: heightScreen * 0.01,
                  paddingLeft: widthScreen * 0.07,
                  width: widthScreen * 0.76,
                  height: heightScreen * 0.07,
                  controllerForm: _valor,
                  keyForm: _form,
                  textHintForm: '',
                  marginTop: heightScreen * 0.01,
                  marginBottom: heightScreen * 0.01,
                ),
                Text(
                  'Senha',
                  style: TextStyle(
                    fontSize: 16,
                  ),
                ),
                ContainerWithForm(
                  widthAdjusted: widthScreen * 0.76,
                  heightAdjusted: heightScreen * 0.07,
                  paddingTop: heightScreen * 0.01,
                  paddingLeft: widthScreen * 0.07,
                  width: widthScreen * 0.76,
                  height: heightScreen * 0.07,
                  controllerForm: _valor1,
                  keyForm: _form1,
                  textHintForm: '',
                  marginTop: heightScreen * 0.01,
                  marginBottom: heightScreen * 0.01,
                ),
                Row(
                  children: [
                    Spacer(
                      flex: 5,
                    ),
                    InkWell(
                      onTap: () {
                        navigateToPage('/forgotPasswordPage');
                      },
                      child: Text(
                        'Esqueceu a senha?',
                        style: TextStyle(
                            fontSize: 11, decoration: TextDecoration.underline),
                      ),
                    ),
                    Spacer()
                  ],
                ),
                ContainerWithButton(
                  heightAdjusted: heightScreen * 0.09,
                  widthAdjusted: widthScreen * 0.41,
                  marginTop: heightScreen * 0.02,
                  width: widthScreen * 0.41,
                  height: heightScreen * 0.09,
                  labelText: 'Login',
                  marginBottom: heightScreen * 0.04,
                  onPressed: () async {
                    await logarUser('/homePage', _valor.text, _valor1.text);
                  },
                ),
                Container(
                  margin: EdgeInsets.only(
                      top: heightScreen * 0.09, bottom: heightScreen * 0.01),
                  child: InkWell(
                    onTap: () {
                      AppConfigs.saveLastRoute('/signUpPage');
                      context.push('/signUpPage');
                    },
                    child: Text(
                      'Cadastre-se',
                      style: TextStyle(fontSize: 15),
                    ),
                  ),
                )
              ],
            ),
          ),
        ),
      ),
    );
  }
}
