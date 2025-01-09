import 'package:app_plantinha/provider/font_size.provider.dart';
import 'package:app_plantinha/provider/light_dark.provider.dart';
import 'package:app_plantinha/widgets/row_with_text.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class CardPlantResults extends StatelessWidget {
  const CardPlantResults({super.key, required this.cientificName, required this.image, required this.name});
  final String name, cientificName, image;

  @override
  Widget build(BuildContext context) {
    double heightScreen = MediaQuery.of(context).size.height;
    double widthScreen = MediaQuery.of(context).size.width;
    double fontSizeProvider = Provider.of<FontSizeState>(context).fontSize;
    String themeProvider = Provider.of<LightDarkState>(context).tema;
    return Card(
      margin: EdgeInsets.only(bottom: 30),
      color: Color(0xFF997C70),
      child: SizedBox(
        width: widthScreen * 0.9,
        height: heightScreen * 0.2,
        child: Padding(
          padding: EdgeInsets.all(8),
          child: Row(
            children: [
              Image.asset(image),
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
                      textLabel: cientificName,
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
                          onTap: (){},
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