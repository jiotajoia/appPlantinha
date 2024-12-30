import 'package:app_plantinha/widgets/containerwithbutton.widget.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';

class HomePage extends StatelessWidget {
  const HomePage({super.key, required this.title});
  final String title;

  static final List<Map<String, dynamic>> valuesContainers = [
    {'icon': Icons.quiz, 'label': 'Quiz'},
    {'icon': Icons.image, 'label': 'Imagem'},
  ];

  static final List<Map<String, dynamic>> valuesListTiles = [
    {'icon': Icons.history, 'label': 'Histórico'},
    {'icon': Icons.settings_outlined, 'label': 'Configurações'},
    {'icon': Icons.help_outline, 'label': 'Ajuda'},
    {'icon': Icons.logout, 'label': 'Sair'},
  ];

  void retornaNada() {}

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('AppPlantinha'),
      ),
      drawer: Container(
        height: 823,
        width: 201,
        child: Drawer(
          child: ListView(
            padding: EdgeInsets.zero,
            children: [
              Container(
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
                                style: TextStyle(
                                    color: Colors.white, fontSize: 12),
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
                        onTap: () {},
                      );
                    }),
                    Padding(
                      padding: EdgeInsets.only(right: 30)),
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
        ),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.start,
          children: [
            Container(
              margin: EdgeInsets.only(top: 30, bottom: 60),
              width: 126,
              height: 126,
              child: ClipOval(child: Image.asset('lib/images/logo.png')),
            ),
            Text(
              'Buscar Planta',
              style: TextStyle(fontSize: 16),
            ),
            ...valuesContainers.map((data) {
              return ContainerWithButton(
                icon: Icon(data['icon']),
                labelText: data['label'],
              );
            }),
          ],
        ),
      ),
    );
  }
}
