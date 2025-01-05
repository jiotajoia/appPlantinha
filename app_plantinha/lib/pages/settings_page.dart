import 'package:app_plantinha/configs/app.configs.dart';
import 'package:app_plantinha/widgets/row_button_back.widget.dart';
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
                RowButtonBack(lastRoute: '/homePage'),
              ],
            ),
            Row(
              children: [
                Container(
                  margin: EdgeInsets.only(left: 23, bottom: 10),
                  child: InkWell(
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
                ),
              ],
            ),
            Divider(
              color: Colors.black,
              endIndent: 25,
              indent: 25,
            ),
            Row(
              children: [
                Container(
                  margin: EdgeInsets.only(left: 23, bottom: 10),
                  child: InkWell(
                    onTap: () {
                      AppConfigs.saveLastRoute('/settingsPage/appSettingsPage');
                      context.push('/settingsPage/appSettingsPage');
                    },
                    child: SizedBox(
                      width: MediaQuery.of(context).size.width - 23,
                      child: Text(
                        'Configurações do Aplicativo ',
                        style: TextStyle(
                          fontWeight: FontWeight.bold,
                          fontSize: 20,
                        ),
                      ),
                    ),
                  ),
                ),
              ],
            ),
            Divider(
              color: Colors.black,
              endIndent: 25,
              indent: 25,
            ),
          ],
        ),
      ),
    );
  }
}
