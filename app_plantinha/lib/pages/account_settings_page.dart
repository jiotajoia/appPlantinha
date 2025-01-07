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
    double heightScreen = MediaQuery.of(context).size.height;
    double widthScreen = MediaQuery.of(context).size.width;

    return ScaffoldBase(
      body: Padding(
        padding: EdgeInsets.only(top: heightScreen * 0.017),
        child: Center(
          child: Column(
            children: [
              RowButtonBack(lastRoute: '/settingsPage'),
              RowWithText(
                textLabel: 'Conta',
                fontWeight: FontWeight.bold,
                fontSize: Provider.of<FontSizeState>(context).fontSize + 5,
                marginTop: heightScreen * 0.054,
                marginLeft: widthScreen * 0.072,
              ),
              RowWithText(
                textLabel: 'Alterar nome',
                fontSize: Provider.of<FontSizeState>(context).fontSize,
                marginLeft: widthScreen * 0.084,
                marginBottom: heightScreen * 0.013,
              ),
              ContainerWithForm(
                  fontSizeHint: Provider.of<FontSizeState>(context).fontSize - 3,
                  fontSizeForm: Provider.of<FontSizeState>(context).fontSize,
                  height: heightScreen * 0.044, 
                  width: widthScreen * 0.4,
                  widthAdjusted: widthScreen * 0.72, 
                  heightAdjusted: heightScreen * 0.076,
                  paddingLeft: widthScreen * 0.036,
                  textHintForm: 'Digite o novo nome...',
                  controllerForm: _valor,
                  keyForm: _form),
              ContainerWithButton(
                widthAdjusted: widthScreen * 0.291, 
                heightAdjusted: heightScreen * 0.061,
                onPressed: () {},
                marginTop: heightScreen * 0.013,
                width: widthScreen * 0.206,
                height: heightScreen * 0.047,
                labelText: 'Alterar',
                fontSize: Provider.of<FontSizeState>(context).fontSize - 2,
              ),
              Container(
                margin: EdgeInsets.only(
                  top: heightScreen * 0.04,
                  left: widthScreen * 0.084,
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
                        style: TextStyle(
                          fontSize: Provider.of<FontSizeState>(context).fontSize,
                        ),
                      )),
                    )
                  ],
                ),
              ),
              RowWithText(
                fontSize: Provider.of<FontSizeState>(context).fontSize,
                textLabel: 'Excluir conta',
                marginTop: heightScreen * 0.04,
                marginLeft: widthScreen * 0.084,
              ),
              ContainerWithButton(
                widthAdjusted: widthScreen * 0.291, 
                heightAdjusted: heightScreen * 0.061, 
                marginTop: heightScreen * 0.013,
                width: widthScreen * 0.206,
                height: heightScreen * 0.047,
                labelText: 'Excluir',
                onPressed: () {},
                fontSize: Provider.of<FontSizeState>(context).fontSize - 2,
              ),
            ],
          ),
        ),
      ),
    );
  }
}
