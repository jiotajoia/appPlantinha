import 'package:app_plantinha/configs/app.configs.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';
import 'package:go_router/go_router.dart';

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
    return Drawer(
      child: ListView(
        padding: EdgeInsets.zero,
        children: [
          Container(
            width: 60,
            height: 230,
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
                        icon: SvgPicture.asset(
                          'lib/icons/tema.svg',
                        )),
                  ],
                ),
                Row(
                  mainAxisAlignment: MainAxisAlignment.start,
                  children: [
                    Container(
                      margin: EdgeInsets.only(left: 20),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        mainAxisSize: MainAxisSize.max,
                        children: [
                          SizedBox(
                            width: 77,
                            height: 77,
                            child: CircleAvatar(
                              backgroundImage:
                                  AssetImage('lib/images/imageUser.webp'),
                            ),
                          ),
                          Padding(
                            padding: EdgeInsets.only(top: 10),
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
            height: MediaQuery.of(context).size.height - 230,
            decoration: const BoxDecoration(color: Color(0xFF997C70)),
            child: Column(
              children: [
                Padding(padding: EdgeInsets.only(top: 20)),
                ...valuesListTiles.map((data) {
                  return ListTile(
                    leading: Icon(
                      data['icon'],
                      size: 24,
                    ),
                    title: Text(
                      data['label'],
                      style: TextStyle(fontSize: 18),
                    ),
                    onTap: () {
                      AppConfigs.saveLastRoute(data['route']);
                      context.push(data['route']);
                    },
                  );
                }),
                Padding(padding: EdgeInsets.only(right: 30)),
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
