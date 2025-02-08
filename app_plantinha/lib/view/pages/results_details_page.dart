import 'package:app_plantinha/controllers/provider/font_size.provider.dart';
import 'package:app_plantinha/controllers/provider/light_dark.provider.dart';
import 'package:app_plantinha/view/widgets/row_button_back.widget.dart';
import 'package:app_plantinha/view/widgets/row_with_text.dart';
import 'package:app_plantinha/view/widgets/scaffold_base.widget.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class ResultsDetailsPage extends StatelessWidget {
  const ResultsDetailsPage(
      {super.key,
      required this.ambient,
      required this.cares,
      required this.cientificName,
      required this.curiosities,
      required this.name,
      required this.shadowOrLightType,
      required this.image});
  final String name,
      cientificName,
      shadowOrLightType,
      ambient,
      cares,
      curiosities,
      image;

  Row getParagraph(String title, String content, double fontSize,
      Color colorText, double width, double marginBottom) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Container(
          margin: EdgeInsets.only(bottom: marginBottom),
          width: width,
          child: RichText(
              textAlign: TextAlign.justify,
              text: TextSpan(
                  text: '+  $title: ',
                  style: TextStyle(
                      fontWeight: FontWeight.bold,
                      fontSize: fontSize,
                      color: colorText),
                  children: <TextSpan>[
                TextSpan(
                    text: content,
                    style: TextStyle(
                      color: colorText,
                      fontSize: fontSize,
                      fontWeight: FontWeight.normal,
                    ))
              ])),
        ),
      ],
    );
  }

  @override
  Widget build(BuildContext context) {
    //double heightScreen = MediaQuery.of(context).size.height;
    double widthScreen = MediaQuery.of(context).size.width;
    double fontSizeProvider = Provider.of<FontSizeState>(context).fontSize;
    Color colorText = Provider.of<LightDarkState>(context).tema == 'light'
        ? Colors.black
        : Colors.white;

    return ScaffoldBase(
      body: SingleChildScrollView(
        child: Align(
          alignment: Alignment.center,
          child: Column(
            children: [
              RowButtonBack(
                  ),
              RowWithText(
                  textLabel: 'Detalhes',
                  mainAxisAlignment: MainAxisAlignment.center,
                  fontWeight: FontWeight.bold,
                  fontSize: fontSizeProvider + 9,
                  textDecoration: TextDecoration.underline,
                  marginBottom: 30,
                  textColor: colorText),
              Image.asset(
                image,
                width: 200,
                height: 200,
              ),
              RowWithText(
                textLabel: '•   Nome: $name',
                fontSize: fontSizeProvider + 4,
                marginLeft: 30,
                marginTop: 30,
              ),
              RowWithText(
                textLabel: '•   Nome científico: $cientificName',
                fontSize: fontSizeProvider + 4,
                marginLeft: 30,
              ),
              RowWithText(
                textLabel: '•   Sombra/Luz $shadowOrLightType',
                fontSize: fontSizeProvider + 4,
                marginLeft: 30,
                marginBottom: 30,
              ),
              getParagraph('Ambiente', ambient, fontSizeProvider + 1, colorText,
                  widthScreen * 0.747, 15),
              getParagraph('Cuidados', cares, fontSizeProvider + 1, colorText,
                  widthScreen * 0.747, 15),
              getParagraph('Curiosidades', curiosities, fontSizeProvider + 1,
                  colorText, widthScreen * 0.747, 45)
            ],
          ),
        ),
      ),
    );
  }
}
