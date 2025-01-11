import 'package:app_plantinha/pages/results_details_page.dart';
import 'package:app_plantinha/provider/font_size.provider.dart';

import 'package:app_plantinha/widgets/row_with_text.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class CardPlantResults extends StatelessWidget {
  const CardPlantResults({super.key, required this.cientificName, required this.image, required this.name, required this.ambient, required this.cares, required this.curiosities, required this.shadowOrLightType});
  final String name, cientificName, image, shadowOrLightType, ambient, cares, curiosities;

  @override
  Widget build(BuildContext context) {
    double heightScreen = MediaQuery.of(context).size.height;
    double widthScreen = MediaQuery.of(context).size.width;
    double fontSizeProvider = Provider.of<FontSizeState>(context).fontSize;
    
    return Card(
      margin: EdgeInsets.only(bottom: 30),
      color: Color(0xFF997C70),
      child: SizedBox(
        //width: fontSizeProvider>= 20 ? widthScreen * 0.98 : widthScreen * 0.9,
        width: widthScreen * 0.98,
        height: fontSizeProvider >= 24 ? heightScreen * 0.5 : heightScreen * 0.25,
        child: Padding(
          padding: EdgeInsets.all(8),
          child: Row(
            children: [
              Image.asset(image, width: 147, height: 147,),
              Expanded(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Spacer(),
                    RowWithText(
                      mainAxisAlignment: MainAxisAlignment.center,
                      textLabel: name,
                      fontSize: fontSizeProvider + 5,
                      fontWeight: FontWeight.bold, 
                      textColor: Colors.white,
                    ),
                    RowWithText(
                      marginLeft: 20,
                      textLabel: 'Nome científico: \n$cientificName',
                      fontSize: fontSizeProvider - 2,
                      fontWeight: FontWeight.bold,
                      textColor: Colors.white,
                      mainAxisAlignment: MainAxisAlignment.center,
                    ),
                    Spacer(),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.end,
                      children: [
                        InkWell(
                          onTap: (){
                            Navigator.push(
                            context,
                            MaterialPageRoute(
                              builder: (context) => ResultsDetailsPage(
                                image: image,
                                name: name,
                                cientificName: cientificName,
                                shadowOrLightType: shadowOrLightType,
                                ambient: ambient,
                                cares: cares,
                                curiosities: curiosities,
                              ),
                            ),
                          );
                          },
                          child: Text(
                            '• Ver detalhes',
                            style: TextStyle(
                              color: Colors.white, fontWeight: FontWeight.bold
                            ),
                          ),
                        )
                      ],
                    )
                  ],
                ),
              )
            ],
          ),
        ),
      ),
    );
  }
}