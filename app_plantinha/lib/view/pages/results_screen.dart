import 'package:app_plantinha/controllers/provider/font_size.provider.dart';
import 'package:app_plantinha/controllers/provider/light_dark.provider.dart';
import 'package:app_plantinha/view/widgets/card_plant_results.widget.dart';
import 'package:app_plantinha/view/widgets/row_button_back.widget.dart';
import 'package:app_plantinha/view/widgets/row_with_text.dart';
import 'package:app_plantinha/view/widgets/scaffold_base.widget.dart';
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
    {'name': 'Samambaia', 'cientificName': 'Nephrolepis exaltata', 'image': 'lib/images/imagePlant1.png', 'ambient': 'A samambaia prefere locais sombreados, úmidos, com luz indireta, temperaturas amenas e solo bem drenado.', "shadowOrLightType": "Indireta", "cares" : "A samambaia precisa de luz indireta, ambiente úmido, solo bem drenado, temperaturas amenas e evitar sol direto e correntes de ar frio.", "curiosities": "A samambaia é uma das plantas mais antigas do planeta, com fósseis que datam de mais de 300 milhões de anos."},
    {'name': 'Filodendro-elegante', 'cientificName': 'Philodendron elegans', 'image': 'lib/images/imagePlant2.png', 'ambient': 'A samambaia prefere ambientes sombreados, úmidos, com luz indireta, temperaturas amenas e solo bem drenado.', "shadowOrLightType": "Indireta", "cares" : "A samambaia precisa de luz indireta, ambiente úmido, solo bem drenado, temperaturas amenas e evitar sol direto e correntes de ar frio.", "curiosities": "A samambaia é uma das plantas mais antigas do planeta, com fósseis que datam de mais de 300 milhões de anos."},
    {'name': 'Filodendro-elegante', 'cientificName': 'Philodendron elegans', 'image': 'lib/images/imagePlant2.png', 'ambient': 'A samambaia prefere ambientes sombreados, úmidos, com luz indireta, temperaturas amenas e solo bem drenado.', "shadowOrLightType": "Indireta", "cares" : "A samambaia precisa de luz indireta, ambiente úmido, solo bem drenado, temperaturas amenas e evitar sol direto e correntes de ar frio.", "curiosities": "A samambaia é uma das plantas mais antigas do planeta, com fósseis que datam de mais de 300 milhões de anos."},
  ];

  @override
  Widget build(BuildContext context) {
    //double heightScreen = MediaQuery.of(context).size.height;
    //double widthScreen = MediaQuery.of(context).size.width;
    double fontSizeProvider = Provider.of<FontSizeState>(context).fontSize;
    String themeProvider = Provider.of<LightDarkState>(context).tema;
    
    return ScaffoldBase(
      body: SingleChildScrollView(
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
                curiosities: data["curiosities"],
                cares: data["cares"],
                shadowOrLightType: data["shadowOrLightType"],
                ambient: data["ambient"],
                cientificName: data["cientificName"], 
                image: data["image"], 
                name: data["name"]
              );
            }),
          ],
        ),
      ),
    );
  }
}