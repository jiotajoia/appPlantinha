import 'package:app_plantinha/configs/app.configs.dart';
import 'package:app_plantinha/provider/font_size.provider.dart';
import 'package:app_plantinha/widgets/container_with_button.widget.dart';
import 'package:app_plantinha/widgets/row_with_text.dart';
import 'package:app_plantinha/widgets/scaffold_base.widget.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key, required this.title});
  final String title;

  static final List<Map<String, dynamic>> valuesContainers = [
    {'icon': Icons.quiz, 'label': 'Quiz', 'lastRoute': '/homePage/searchByQuizPage'},
    {'icon': Icons.image, 'label': 'Imagem', 'lastRoute': '/homePage/searchByImagePage'},
  ];

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage>{
  double width = 0, height = 0, sizeImage = 0;
  void navigateToSearchPage(String lastRoute){
    AppConfigs.saveLastRoute(lastRoute);
    context.push(lastRoute);
  }

  double getPropertyAdjested(BuildContext context, double property, double valueBase, double valueAdjusted){
    setState(() {
      if(Provider.of<FontSizeState>(context).fontSize >= 30){
        property = valueAdjusted;
      }else{
        property = valueBase;
      }
    });
    return property;
  }

  @override
  Widget build(BuildContext context) {
    return ScaffoldBase(
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.start,
          children: [
            Container(
              margin: EdgeInsets.only(top: 30, bottom: 60),
              width: getPropertyAdjested(context, sizeImage, 126, 150),
              height: getPropertyAdjested(context, sizeImage, 126, 150),
              child: ClipOval(child: Image.asset('lib/images/logo.png')),
            ),
            RowWithText(
              mainAxisAlignment: MainAxisAlignment.center,
              textLabel: 'Buscar Planta',
            ),
            ...HomePage.valuesContainers.map((data) {
              return ContainerWithButton(
                width: 159,
                widthAdjusted: 250,
                height: 66, 
                heightAdjusted: 80,
                fontSize: Provider.of<FontSizeState>(context).fontSize,
                rectangleRoundedBorder: true,
                marginBottom: 15,
                marginTop: 15,
                icon: Icon(data['icon'], size: Provider.of<FontSizeState>(context).fontSize,),
                labelText: data['label'],
                onPressed: (){
                  navigateToSearchPage(data['lastRoute']);
                } ,
              );
            }),
          ],
        ),
      ),
    );
  }
}
