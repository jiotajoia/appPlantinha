import 'package:app_plantinha/configs/app.configs.dart';
import 'package:app_plantinha/widgets/container_with_button.widget.dart';
import 'package:app_plantinha/widgets/container_with_form.widget.dart';
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

  void navigateToPage(String lastRoute){
    AppConfigs.saveLastRoute(lastRoute);
    context.go(lastRoute);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Padding(
        padding: EdgeInsets.only(top: 72),
        child: Center(
          child: Column(
            children: [
              Container(
                margin: EdgeInsets.only(bottom: 10),
                width: 186,
                height: 186,
                child: ClipOval(child: Image.asset('lib/images/logo.png')),
              ),
              Text(
                'E-mail',
                style: TextStyle(
                  fontSize: 16,
                ),
              ),
              ContainerWithForm(
                paddingFormTop: 8,
                paddingFormLeft: 30,
                width: 315,
                height: 56,
                valor: _valor,
                keyForm: _form,
                textHintForm: '',
                marginTop: 10,
                marginBottom: 10,
              ),
              Text(
                'Senha',
                style: TextStyle(
                  fontSize: 16,
                ),
              ),
              ContainerWithForm(
                paddingFormTop: 8,
                paddingFormLeft: 30,
                width: 315,
                height: 56,
                valor: _valor1,
                keyForm: _form1,
                textHintForm: '',
                marginTop: 10,
                marginBottom: 10,
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
                marginTop: 20,
                width: 169,
                height: 71,
                labelText: 'Login',
                marginBottom: 35,
                onPressed: (){
                  navigateToPage('/homePage');
                }
              ),
              InkWell(
                onTap: () {
                  context.go('/homePage');
                },
                child: Text(
                  'Permanecer desconectado',
                  style: TextStyle(
                      fontSize: 12, decoration: TextDecoration.underline),
                ),
              ),
              Container(
                margin: EdgeInsets.only(top: 80, bottom: 10),
                child: InkWell(
                  onTap: (){
                    AppConfigs.saveLastRoute('/signUpPage');
                    context.push('/signUpPage');
                  },
                  child: Text('Cadastre-se'),
                ),
              )
            ],
          ),
        ),
      ),
    );
  }
}
