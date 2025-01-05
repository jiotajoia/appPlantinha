import 'package:app_plantinha/configs/app.configs.dart';
import 'package:app_plantinha/provider/font_size.provider.dart';
import 'package:app_plantinha/widgets/container_with_button.widget.dart';
import 'package:app_plantinha/widgets/container_with_form.widget.dart';
import 'package:app_plantinha/widgets/row_button_back.widget.dart';
import 'package:app_plantinha/widgets/row_with_text.dart';
import 'package:app_plantinha/widgets/scaffold_base.widget.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';

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
                  height: 33, 
                  width: 165,
                  widthAdjusted: 300, 
                  heightAdjusted: 56,
                  paddingLeft: 15,
                  textHintForm: 'Digite o novo nome...',
                  controllerForm: _valor,
                  keyForm: _form),
              ContainerWithButton(
                widthAdjusted: 120, 
                heightAdjusted: 45,
                onPressed: () {},
                marginTop: 4,
                width: 85,
                height: 35,
                labelText: 'Alterar',
                fontSize: Provider.of<FontSizeState>(context).fontSize,
              ),
              Container(
                margin: EdgeInsets.only(
                  top: 30,
                  left: 35,
                ),
                child: Row(
                  children: [
                    InkWell(
                      onTap: () {
                        AppConfigs.saveLastRoute(
                            '/settingsPage/accountSettingsPage/changePasswordPage');
                        context.push(
                            '/settingsPage/accountSettingsPage/changePasswordPage');
                      },
                      child: Flexible(
                          child: Text(
                        'Alterar senha',
                      )),
                    )
                  ],
                ),
              ),
              RowWithText(
                textLabel: 'Excluir conta',
                marginTop: 30,
                marginLeft: 35,
              ),
              ContainerWithButton(
                widthAdjusted: 120, 
                heightAdjusted: 45, 
                marginTop: 10,
                width: 85,
                height: 35,
                labelText: 'Excluir',
                onPressed: () {},
                fontSize: Provider.of<FontSizeState>(context).fontSize,
              ),
            ],
          ),
        ),
      ),
    );
  }
}
