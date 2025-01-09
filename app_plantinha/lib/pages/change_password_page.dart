import 'package:app_plantinha/provider/font_size.provider.dart';
import 'package:app_plantinha/widgets/container_with_button.widget.dart';
import 'package:app_plantinha/widgets/container_with_form.widget.dart';
import 'package:app_plantinha/widgets/row_button_back.widget.dart';
import 'package:app_plantinha/widgets/row_with_text.dart';
import 'package:app_plantinha/widgets/scaffold_base.widget.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class ChangePasswordPage extends StatefulWidget {
  const ChangePasswordPage({super.key, required this.title});
  final String title;

  @override
  State<ChangePasswordPage> createState() => _ChangePasswordPageState();
}

class _ChangePasswordPageState extends State<ChangePasswordPage> {
  final _form = GlobalKey<FormState>();
  final _form1 = GlobalKey<FormState>();
  final _valor = TextEditingController();
  final _valor1 = TextEditingController();

  @override
  Widget build(BuildContext context) {
    double heightScreen = MediaQuery.of(context).size.height;
    double widthScreen = MediaQuery.of(context).size.width;

    return ScaffoldBase(
      body: Padding(
        padding: const EdgeInsets.only(top: 3),
        child: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.start,
            children: [
              RowButtonBack(lastRoute: '/settingsPage/accountSettingsPage'),
              RowWithText(
                textLabel: 'Alterar Senha',
                fontSize: Provider.of<FontSizeState>(context).fontSize + 5,
                fontWeight: FontWeight.bold,
                marginTop: 40,
                marginLeft: 30,
              ),
              ContainerWithForm(
                fontSizeForm: Provider.of<FontSizeState>(context).fontSize,
                fontSizeHint: Provider.of<FontSizeState>(context).fontSize - 3,
                height: heightScreen * 0.044,
                widthAdjusted: widthScreen * 0.873,
                heightAdjusted: heightScreen * 0.076,
                paddingLeft: widthScreen * 0.036,
                width: widthScreen * 0.762,
                marginTop: heightScreen * 0.02,
                textHintForm: 'Digite nova senha...',
                controllerForm: _valor, 
                keyForm: _form
              ),
              ContainerWithForm(
                fontSizeForm: Provider.of<FontSizeState>(context).fontSize,
                fontSizeHint: Provider.of<FontSizeState>(context).fontSize - 3,
                height: heightScreen * 0.044,
                widthAdjusted: widthScreen * 0.873,
                heightAdjusted: heightScreen * 0.076,
                paddingLeft: widthScreen * 0.036,
                marginBottom: heightScreen * 0.01, 
                width: widthScreen * 0.762,
                marginTop: heightScreen * 0.004,
                textHintForm: 'Confirme nova senha...',
                controllerForm: _valor1, 
                keyForm: _form1
              ),
              ContainerWithButton(
                widthAdjusted: widthScreen * 0.315,
                heightAdjusted: heightScreen * 0.061,
                marginTop: heightScreen * 0.005,
                width: widthScreen * 0.230,
                height: heightScreen * 0.05,
                labelText: 'Alterar',
                onPressed: (){
                
                },
                fontSize: Provider.of<FontSizeState>(context).fontSize,
              ),
            ],
          ),
        ),
      ),
    );
  }
}