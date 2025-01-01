import 'package:app_plantinha/configs/app.configs.dart';
import 'package:app_plantinha/widgets/scaffold_base.widget.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class SettingsPage extends StatelessWidget {
  const SettingsPage({super.key, required this.title});
  final String title;

  @override
  Widget build(BuildContext context) {
    return ScaffoldBase(
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.start,
          children: [
            Row(
              mainAxisSize: MainAxisSize.max,
              children: [
                // Adiciona espaço antes do botão
                Spacer(flex: 1),
                IconButton(
                  onPressed: () {
                    AppConfigs.saveLastRoute('/');
                    context.pop();
                  },
                  icon: Icon(
                    Icons.arrow_back,
                    size: 24,
                  ),
                ),
                Spacer(flex: 40), // Espaço maior após o botão, opcional
              ],
            ),
            Spacer(flex: 1),
            Row(
              children: [
                Spacer(
                  flex: 2,
                ),
                InkWell(
                  onTap: () {
                    AppConfigs.saveLastRoute('/settingsPage/accountSettingsPage');
                    context.push('/settingsPage/accountSettingsPage');
                  },
                  child: Text(
                    'Conta',
                    style: TextStyle(
                      fontWeight: FontWeight.bold,
                      fontSize: 20,
                    ),
                  ),
                ),
                Spacer(
                  flex: 30,
                ),
              ],
            ),
            Spacer(
              flex: 1,
            ),
            Divider(
              color: Colors.black,
              endIndent: 30,
              indent: 23,
            ),
            Spacer(flex: 1,),
            Row(
              children: [
                Spacer(
                  flex: 5,
                ),
                InkWell(
                  onTap: () {
                    AppConfigs.saveLastRoute('/settingsPage/appSettingsPage');
                    context.push('/settingsPage/appSettingsPage');
                  },
                  child: Text(
                    'Configurações do Aplicativo',
                    style: TextStyle(
                      fontWeight: FontWeight.bold,
                      fontSize: 20,
                    ),
                  ),
                ),
                Spacer(
                  flex: 20,
                ),
              ],
            ),
            Spacer(flex: 1,),
            Divider(
              color: Colors.black,
              endIndent: 30,
              indent: 23,
            ),
            Spacer(flex: 40),
          ],
        ),
      ),
    );
  }
}
