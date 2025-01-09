import 'package:app_plantinha/provider/font_size.provider.dart';
import 'package:app_plantinha/provider/light_dark.provider.dart';
import 'package:app_plantinha/widgets/card_plant_results.widget.dart';
import 'package:app_plantinha/widgets/row_button_back.widget.dart';
import 'package:app_plantinha/widgets/row_with_text.dart';
import 'package:app_plantinha/widgets/scaffold_base.widget.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class ResultsScreen extends StatefulWidget {
  const ResultsScreen({super.key, required this.title});
  final String title;
  @override
  State<ResultsScreen> createState() => _ResultsScreenState();
}

class _ResultsScreenState extends State<ResultsScreen> {
   final List<Map<String, dynamic>> valuesCardsPlants = [
    {'name':  'Samambaia', 'cientificName': 'Nome científico:  \nNephrolepis exaltata', 'image': 'lib/images/imagePlant.png'},
    {'name': 'Filodendro-elegante', 'cientificName': 'Nome científico:  \nPhilodendron elegans', 'image': 'lib/images/imagePlant2.png'},
  ];

  @override
  Widget build(BuildContext context) {
    double heightScreen = MediaQuery.of(context).size.height;
    double widthScreen = MediaQuery.of(context).size.width;
    double fontSizeProvider = Provider.of<FontSizeState>(context).fontSize;
    String themeProvider = Provider.of<LightDarkState>(context).tema;
    return ScaffoldBase(
      body: Padding(
        padding: EdgeInsets.only(
          top: heightScreen * 0.004,
        ),
        child: Center(
          child: SingleChildScrollView(
            child: Column(
              children: [
                RowButtonBack(lastRoute: '/homePage'),
                RowWithText(
                  textLabel: 'Resultados',
                  mainAxisAlignment: MainAxisAlignment.center,
                  fontWeight: FontWeight.bold,
                  fontSize: fontSizeProvider + 9,
                  textDecoration: TextDecoration.underline,
                  marginBottom: 30,
                  textColor: themeProvider == "light" ? Colors.black : Colors.white,
                ),
                ...valuesCardsPlants.map((data){
                  return CardPlantResults(
                    cientificName: data["cientificName"], 
                    image: data["image"], 
                    name: data["name"]
                  );
                }),
              ],
            ),
          ),
        ),
      ),
    );
  }
}