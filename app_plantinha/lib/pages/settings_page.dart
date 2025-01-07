import 'package:app_plantinha/configs/app.configs.dart';
import 'package:app_plantinha/provider/font_size.provider.dart';
import 'package:app_plantinha/provider/light_dark.provider.dart';
import 'package:app_plantinha/widgets/row_button_back.widget.dart';
import 'package:app_plantinha/widgets/scaffold_base.widget.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';

class SettingsPage extends StatelessWidget {
  const SettingsPage({super.key, required this.title});
  final String title;

  @override
  Widget build(BuildContext context) {
    double heightScreen = MediaQuery.of(context).size.height;
    double widthScreen = MediaQuery.of(context).size.width;

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
                  margin: EdgeInsets.only(left: widthScreen * 0.055, bottom: heightScreen * 0.013),
                  child: InkWell(
                    onTap: () {
                      AppConfigs.saveLastRoute('/settingsPage/accountSettingsPage');
                      context.push('/settingsPage/accountSettingsPage');
                    },
                    child: Text(
                      'Conta',
                      style: TextStyle(
                        fontWeight: FontWeight.bold,
                        fontSize: Provider.of<FontSizeState>(context).fontSize + 5,
                      ),
                    ),
                  ),
                ),
              ],
            ),
            Divider(
              color: Provider.of<LightDarkState>(context).tema == 'light' ? Colors.black : Colors.white,
              endIndent: widthScreen * 0.055,
              indent: widthScreen * 0.055,
            ),
            Row(
              children: [
                Container(
                  margin: EdgeInsets.only(left: widthScreen * 0.055, bottom: heightScreen * 0.013),
                  child: InkWell(
                    onTap: () {
                      AppConfigs.saveLastRoute('/settingsPage/appSettingsPage');
                      context.push('/settingsPage/appSettingsPage');
                    },
                    child: SizedBox(
                      child: Text(
                        'Configurações do Aplicativo ',
                        style: TextStyle(
                          fontWeight: FontWeight.bold,
                          fontSize: Provider.of<FontSizeState>(context).fontSize + 5,
                        ),
                      ),
                    ),
                  ),
                ),
              ],
            ),
            Divider(
              color: Provider.of<LightDarkState>(context).tema == 'light' ? Colors.black : Colors.white,
              endIndent: widthScreen * 0.055,
              indent: widthScreen * 0.055,
            ),
          ],
        ),
      ),
    );
  }
}
