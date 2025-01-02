import 'package:app_plantinha/configs/app.configs.dart';
import 'package:app_plantinha/widgets/container_with_button.widget.dart';
import 'package:app_plantinha/widgets/container_with_form.widget.dart';
import 'package:app_plantinha/widgets/row_button_back.widget.dart';
import 'package:app_plantinha/widgets/row_with_text.dart';
import 'package:app_plantinha/widgets/scaffold_base.widget.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class AccountSettingsPage extends StatefulWidget {
  const AccountSettingsPage({super.key, required this.title});
  final String title;

  @override
  State<AccountSettingsPage> createState() => _AccountSettingsPageState();
}

class _AccountSettingsPageState extends State<AccountSettingsPage> {
  final _form = GlobalKey<FormState>();
  final _valor = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return ScaffoldBase(
      body: Padding(
        padding: const EdgeInsets.only(top: 3),
        child: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.start,
            children: [
              RowButtonBack(lastRoute: '/settingsPage'),
              RowWithText(
                textLabel: 'Conta',
                fontWeight: FontWeight.bold,
                fontSize: 20, 
                marginTop: 40, 
                marginLeft: 30,
              ),
              RowWithText(
                textLabel: 'Alterar nome',
                marginLeft: 35,
                marginBottom: 10,
              ),
              ContainerWithForm(
                paddingFormBottom: 20,
                paddingFormLeft: 15,
                textHintForm: 'Digite o novo nome...',
                valor: _valor, 
                keyForm: _form
              ),
              ContainerWithButton(
                onPressed: (){},
                marginTop: 4,
                width: 80, 
                height: 23, 
                labelText: 'Alterar',
                fontSize: 13,
              ),
              Container(
                height: 65,
                margin: EdgeInsets.only(top: 30, left: 35),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.start,
                  children: [
                    Column(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        InkWell(
                          onTap: () {
                            AppConfigs.saveLastRoute(
                                '/settingsPage/accountSettingsPage/changePasswordPage');
                            context.push('/settingsPage/accountSettingsPage/changePasswordPage');
                          },
                          child: Text('Alterar senha',),
                        ),
                        Text('Excluir conta',),
                      ],
                    ),
                  ],
                ),
              ),
              ContainerWithButton(
                marginTop: 10,
                width: 80,
                height: 23,
                labelText: 'Excluir',
                onPressed: (){},
              ),
            ],
          ),
        ),
      ),
    );
  }
}
