import 'package:app_plantinha/configs/app.configs.dart';
import 'package:app_plantinha/provider/font_size.provider.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';

class DrawerBase extends StatelessWidget {
  const DrawerBase({super.key});

  static final List<Map<String, dynamic>> valuesListTiles = [
    {'icon': Icons.home_outlined, 'label': 'Home', 'route': '/homePage'},
    {'icon': Icons.history, 'label': 'Histórico', 'route': '/historyPage'},
    {'icon': Icons.settings_outlined, 'label': 'Configurações', 'route': '/settingsPage'},
    {'icon': Icons.help_outline, 'label': 'Ajuda', 'route': '/helpPage'},
    {'icon': Icons.logout, 'label': 'Sair', 'route': '/'},
  ];

  void retornaNada() {}

  @override
  Widget build(BuildContext context) {
    double heightScreen = MediaQuery.of(context).size.height;
    double widthScreen = MediaQuery.of(context).size.width;

    return Drawer(
      width: widthScreen * 0.662,
      child: ListView(
        padding: EdgeInsets.zero,
        children: [
          Container(
            width: widthScreen * 0.145,
            height: heightScreen * 0.319,
            decoration: const BoxDecoration(color: Color(0xFF8EB486)),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.end,
                  children: [
                    IconButton(
                        onPressed: retornaNada,
                        icon: SvgPicture.asset(
                          'lib/icons/fonte.svg', 
                        )),
                    IconButton(
                        onPressed: retornaNada,
                        icon: Icon(Icons.bedtime_outlined, color: Colors.white,)
                    ),
                  ],
                ),
                Row(
                  mainAxisAlignment: MainAxisAlignment.start,
                  children: [
                    Container(
                      margin: EdgeInsets.only(left: widthScreen * 0.048),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        mainAxisSize: MainAxisSize.max,
                        children: [
                          SizedBox(
                            width: widthScreen * 0.186,
                            height: heightScreen * 0.104,
                            child: CircleAvatar(
                              backgroundImage:
                                  AssetImage('lib/images/imageUser.webp'),
                            ),
                          ),
                          Padding(
                            padding: EdgeInsets.only(top: heightScreen * 0.013),
                          ),
                          Text(
                            'jiotajoia',
                            style: TextStyle(
                                color: Colors.white,
                                fontSize: 14,
                                fontWeight: FontWeight.bold),
                          ),
                          Text(
                            'jiotajoia@joia.com',
                            style: TextStyle(color: Colors.white, fontSize: 12),
                          )
                        ],
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
          Container(
            height: heightScreen - heightScreen * 0.319,
            decoration: const BoxDecoration(color: Color(0xFF997C70)),
            child: Column(
              children: [
                Padding(padding: EdgeInsets.only(top: heightScreen * 0.027)),
                ...valuesListTiles.map((data) {
                  return ListTile(
                    leading: Icon(
                      data['icon'],
                      size: 24,
                    ),
                    title: Text(
                      data['label'],
                      style: TextStyle(fontSize: Provider.of<FontSizeState>(context).fontSize),
                    ),
                    onTap: () {
                      AppConfigs.saveLastRoute(data['route']);
                      context.push(data['route']);
                    },
                  );
                }),
                Padding(padding: EdgeInsets.only(right: widthScreen * 0.072)),
                Spacer(),
                Text(
                  '• Version 8.88.8',
                  style: TextStyle(color: Colors.white, fontSize: 16),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
