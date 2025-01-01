import 'package:app_plantinha/widgets/container_with_button.widget.dart';
import 'package:app_plantinha/widgets/scaffold_base.widget.dart';
import 'package:flutter/material.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key, required this.title});
  final String title;

  static final List<Map<String, dynamic>> valuesContainers = [
    {'icon': Icons.quiz, 'label': 'Quiz', 'herotag': 'unique_tag1'},
    {'icon': Icons.image, 'label': 'Imagem', 'herotag': 'unique_tag2'},
  ];

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage>{
  @override
  Widget build(BuildContext context) {
    return ScaffoldBase(
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
            ...HomePage.valuesContainers.map((data) {
              return ContainerWithButton(
                containerDecoration: false,
                marginBottom: 15,
                marginTop: 15,
                heroTag: data['herotag'],
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
