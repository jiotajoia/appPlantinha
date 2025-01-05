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
                fontSize: 20,
                fontWeight: FontWeight.bold,
                marginTop: 40,
                marginLeft: 30,
              ),
              ContainerWithForm(
                height: 33,
                widthAdjusted: 360,
                heightAdjusted: 56,
                paddingBottom: 20,
                paddingLeft: 15,
                width: 314,
                marginTop: 15,
                textHintForm: 'Digite nova senha...',
                controllerForm: _valor, 
                keyForm: _form
              ),
              ContainerWithForm(
                height: 33,
                widthAdjusted: 360,
                heightAdjusted: 56,
                paddingBottom: 20,
                paddingLeft: 15,
                marginBottom: 10, 
                width: 314,
                marginTop: 3,
                textHintForm: 'Confirme nova senha...',
                controllerForm: _valor1, 
                keyForm: _form1
              ),
              ContainerWithButton(
                widthAdjusted: 130,
                heightAdjusted: 45,
                marginTop: 4,
                width: 95,
                height: 37,
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