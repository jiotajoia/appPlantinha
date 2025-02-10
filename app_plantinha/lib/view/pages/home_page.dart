import 'package:app_plantinha/controllers/provider/font_size.provider.dart';
import 'package:app_plantinha/view/widgets/container_with_button.widget.dart';
import 'package:app_plantinha/view/widgets/row_with_text.dart';
import 'package:app_plantinha/view/widgets/scaffold_base.widget.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key, required this.title});
  final String title;

  static final List<Map<String, dynamic>> valuesContainers = [
    {'icon': Icons.quiz, 'label': 'Quiz', 'lastRoute': '/homePage/searchByQuizPage'},
    {'icon': Icons.image, 'label': 'Imagem', 'lastRoute': '/homePage/searchByImagePage'},
    {'icon': Icons.map, 'label': 'Mapa', 'lastRoute': '/homePage/searchByMapsPage'},
  ];

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage>{
  double width = 0, height = 0, sizeImage = 0;


  double getPropertyAdjusted(BuildContext context, double property, double valueBase, double valueAdjusted){
    setState(() {
      if(Provider.of<FontSizeState>(context).fontSize >= 20){
        property = valueAdjusted;
      }else{
        property = valueBase;
      }
    });
    return property;
  }

  @override
  Widget build(BuildContext context) {
    double heightScreen = MediaQuery.of(context).size.height;
    double widthScreen = MediaQuery.of(context).size.width;

    return ScaffoldBase(
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.start,
          children: [
            Container(
              margin: EdgeInsets.only(top: heightScreen * 0.04, bottom: heightScreen * 0.081),
              width: getPropertyAdjusted(context, sizeImage, widthScreen * 0.31, widthScreen * 0.36),
              height: getPropertyAdjusted(context, sizeImage, heightScreen * 0.17, heightScreen * 0.2),
              child: ClipOval(child: Image.asset('lib/images/logo.png')),
            ),
            RowWithText(
              fontSize: Provider.of<FontSizeState>(context).fontSize + 1,
              mainAxisAlignment: MainAxisAlignment.center,
              textLabel: 'Buscar Planta',
            ),
            ...HomePage.valuesContainers.map((data) {
              return ContainerWithButton(
                width: widthScreen * 0.38,
                widthAdjusted: widthScreen * 0.53,
                height: heightScreen * 0.09, 
                heightAdjusted: heightScreen * 0.108,
                fontSize: Provider.of<FontSizeState>(context).fontSize + 1,
                rectangleRoundedBorder: true,
                marginBottom: heightScreen * 0.02,
                marginTop: heightScreen * 0.02,
                icon: Icon(data['icon'], size: Provider.of<FontSizeState>(context).fontSize + 1,),
                labelText: data['label'],
                onPressed: (){
                  Navigator.pushNamed(context, (data['lastRoute']));
                } ,
              );
            }),
          ],
        ),
      ),
    );
  }
}
