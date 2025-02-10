import 'package:app_plantinha/controllers/services/auth_service.dart';
import 'package:app_plantinha/view/widgets/container_with_button.widget.dart';
import 'package:app_plantinha/view/widgets/container_with_form.widget.dart';
import 'package:app_plantinha/view/widgets/row_with_text.dart';
import 'package:flutter/material.dart';

class SignUpPage extends StatefulWidget {
  const SignUpPage({super.key, required this.title});
  final String title;

  @override
  State<SignUpPage> createState() => _SignUpPageState();
}

class _SignUpPageState extends State<SignUpPage> {
  final AuthService auth = AuthService();
  static final List<Map<String, dynamic>> valuesItems = [
    {
      'label': 'Nome',
      'form': GlobalKey<FormState>(),
      'valor': TextEditingController()
    },
    {
      'label': 'E-mail',
      'form': GlobalKey<FormState>(),
      'valor': TextEditingController()
    },
    {
      'label': 'Senha',
      'form': GlobalKey<FormState>(),
      'valor': TextEditingController()
    },
    {
      'label': 'Confirmar senha',
      'form': GlobalKey<FormState>(),
      'valor': TextEditingController()
    },
  ];

  Future<void> cadastrarUser(String nome, String email, String password, String confirmPassword) async{
    try {
      await auth.cadastrarUsers(nome, email, password, confirmPassword);
      // ignore: use_build_context_synchronously
      await auth.logarUsers(email, password, context);

      if (mounted) {
        Navigator.pushNamedAndRemoveUntil(context, '/homePage', (Route<dynamic> route) => false);
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Erro ao fazer cadastro: $e')),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    double heightScreen = MediaQuery.of(context).size.height;
    double widthScreen = MediaQuery.of(context).size.width;

    return Scaffold(
      body: Padding(
        padding: EdgeInsets.only(top: heightScreen * 0.05),
        child: Center(
          child: SingleChildScrollView(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                // Cabeçalho
                Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    IconButton(
                      onPressed: () {
                        Navigator.pop(context);
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
                      margin: EdgeInsets.only(
                          bottom: heightScreen * 0.01, right: widthScreen * 0.02),
                      width: widthScreen * 0.14,
                      height: heightScreen * 0.08,
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
                        marginLeft: widthScreen * 0.15,
                        marginTop: heightScreen * 0.03,
                        fontSize: 14,
                        marginBottom: heightScreen * 0.01,
                      ),
                      ContainerWithForm(
                        widthAdjusted: widthScreen * 0.82,
                        heightAdjusted: heightScreen * 0.06,
                        controllerForm: data['valor'],
                        keyForm: data['form'],
                        width: widthScreen * 0.82,
                        height: heightScreen * 0.06,
                        paddingLeft: widthScreen * 0.03,
                        marginLeft: widthScreen * 0.08,
                        marginBottom: 14,
                        fontSizeForm: 16,
                        fontSizeHint: 12,
                      ),
                    ],
                  );
                }),
                // Botão de criação de conta
                Align(
                  alignment: Alignment.centerRight, // Alinha o botão à direita.
                  child: ContainerWithButton(
                    width: widthScreen * 0.33,
                    height: heightScreen * 0.08,
                    widthAdjusted: widthScreen * 0.39,
                    heightAdjusted: heightScreen * 0.09,
                    labelText: 'Criar conta',
                    marginRight: widthScreen * 0.02,
                    marginTop: heightScreen * 0.04,
                    onPressed: () async {
                      
                      await cadastrarUser(valuesItems[0]['valor'].text, valuesItems[1]['valor'].text, valuesItems[2]['valor'].text, valuesItems[3]['valor'].text);
                    },
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
