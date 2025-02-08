import 'package:app_plantinha/controllers/provider/font_size.provider.dart';
import 'package:app_plantinha/controllers/provider/light_dark.provider.dart';
import 'package:app_plantinha/view/widgets/row_button_back.widget.dart';
import 'package:app_plantinha/view/widgets/scaffold_base.widget.dart';
import 'package:flutter/material.dart';
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
                RowButtonBack(),
              ],
            ),
            Row(
              children: [
                Container(
                  margin: EdgeInsets.only(left: widthScreen * 0.055, bottom: heightScreen * 0.013),
                  child: InkWell(
                    onTap: () {
                      Navigator.pushNamed(context, '/settingsPage/accountSettingsPage');
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
                      Navigator.pushNamed(context, '/settingsPage/appSettingsPage');
                    },
                    child: SizedBox(
                      width:  widthScreen - widthScreen * 0.055,
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
