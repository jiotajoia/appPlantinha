import 'package:app_plantinha/configs/app.configs.dart';
import 'package:app_plantinha/widgets/container_with_button.widget.dart';
import 'package:app_plantinha/widgets/container_with_form.widget.dart';
import 'package:app_plantinha/widgets/row_with_text.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class SignUpPage extends StatefulWidget {
  const SignUpPage({super.key, required this.title});
  final String title;

  @override
  State<SignUpPage> createState() => _SignUpPageState();
}

class _SignUpPageState extends State<SignUpPage> {

  static final List<Map<String, dynamic>> valuesItems = [
    {'icon': Icons.home_outlined, 'label': 'Nome', 'form': GlobalKey<FormState>(), 'valor': TextEditingController()},
    {'icon': Icons.history, 'label': 'E-mail', 'form': GlobalKey<FormState>(), 'valor': TextEditingController()},
    {'icon': Icons.settings_outlined, 'label': 'Senha', 'form': GlobalKey<FormState>(), 'valor': TextEditingController()},
    {'icon': Icons.help_outline, 'label': 'Confirmar senha', 'form': GlobalKey<FormState>(), 'valor': TextEditingController()},
  ];

  void navigateToHomePage(){
    AppConfigs.saveLastRoute('/homePage');
    context.go('/homePage');
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Padding(
        padding: EdgeInsets.only(top: 40),
        child: Center(
          child: Column(
            children: [
              Row(
                mainAxisSize: MainAxisSize.max,
                children: [
                  Container(
                    padding: const EdgeInsets.only(left: 9),
                    child: IconButton(
                      onPressed: () {
                        AppConfigs.saveLastRoute('/');
                        context.pop();
                      },
                      icon: Icon(
                        Icons.arrow_back,
                        size: 24,
                      ),
                    ),
                  ),
                  Text(
                    'Cadastro',
                    style: TextStyle(fontSize: 24),
                  ),
                  Spacer(),
                  Container(
                    margin: EdgeInsets.only(bottom: 10, right: 10),
                    width: 59,
                    height: 59,
                    child: ClipOval(child: Image.asset('lib/images/logo.png')),
                  )
                ],
              ),
              ...valuesItems.map((data) {
                return Row(
                  children: [
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        RowWithText(
                          textLabel: data['label'],
                          marginLeft: 63,
                          marginTop: 28,
                          fontSize: 14,
                          marginBottom: 10,
                        ),
                        ContainerWithForm(
                          valor: data['valor'], 
                          keyForm: data['form'],
                          width: 341,
                          height: 47,
                          paddingFormBottom: 10,
                          paddingFormLeft: 15,
                          marginLeft: 37,
                          marginBottom: 14,
                        ),
                      ],
                    )
                  ],
                );
              }),
              
              Row(
                children: [
                  Spacer(),
                  ContainerWithButton(
                    containerDecoration: false,
                    fabRounded: true,
                    width: 139, 
                    height: 58, 
                    labelText: 'Criar conta',
                    marginRight: 20,
                    marginTop: 28,
                    onPressed: navigateToHomePage,
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}
