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
    {'label': 'Nome', 'form': GlobalKey<FormState>(), 'valor': TextEditingController()},
    {'label': 'E-mail', 'form': GlobalKey<FormState>(), 'valor': TextEditingController()},
    {'label': 'Senha', 'form': GlobalKey<FormState>(), 'valor': TextEditingController()},
    {'label': 'Confirmar senha', 'form': GlobalKey<FormState>(), 'valor': TextEditingController()},
  ];

  void navigateToHomePage() {
    AppConfigs.saveLastRoute('/homePage');
    context.go('/homePage');
  }

  @override
  Widget build(BuildContext context) {
    debugDumpRenderTree(); // Útil para verificar problemas de layout durante a execução.
    return Scaffold(
      body: Padding(
        padding: const EdgeInsets.only(top: 40),
        child: Center(
          child: Column(
            mainAxisSize: MainAxisSize.min, // Ocupa apenas o espaço necessário.
            children: [
              // Cabeçalho
              Row(
                mainAxisSize: MainAxisSize.max, // Expande para preencher o espaço disponível.
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  IconButton(
                    onPressed: () {
                      AppConfigs.saveLastRoute('/');
                      context.pop();
                    },
                    icon: const Icon(
                      Icons.arrow_back,
                      size: 24,
                    ),
                  ),
                  const Text(
                    'Cadastro',
                    style: TextStyle(fontSize: 24),
                  ),
                  const Spacer(), // Cria um espaço flexível entre o texto e a imagem.
                  Container(
                    margin: const EdgeInsets.only(bottom: 10, right: 10),
                    width: 59,
                    height: 59,
                    child: ClipOval(
                      child: Image.asset('lib/images/logo.png'),
                    ),
                  ),
                ],
              ),
              // Campos do formulário
              ...valuesItems.map((data) {
                return Column(
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
                );
              }),
              // Botão de criação de conta
              Align(
                alignment: Alignment.centerRight, // Alinha o botão à direita.
                child: ContainerWithButton(
                  width: 139,
                  height: 58,
                  widthAdjusted: 160,
                  heightAdjusted: 70,
                  labelText: 'Criar conta',
                  marginRight: 10,
                  marginTop: 28,
                  onPressed: navigateToHomePage,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
