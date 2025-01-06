import 'package:app_plantinha/provider/font_size.provider.dart';
import 'package:app_plantinha/provider/light_dark.provider.dart';
import 'package:app_plantinha/widgets/container_with_button.widget.dart';
import 'package:app_plantinha/widgets/row_button_back.widget.dart';
import 'package:app_plantinha/widgets/row_with_text.dart';
import 'package:app_plantinha/widgets/scaffold_base.widget.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';
import 'package:provider/provider.dart';

class AppSettingsPage extends StatefulWidget {
  const AppSettingsPage({super.key, required this.title});
  final String title;

  @override
  State<AppSettingsPage> createState() => _AppSettingsPageState();
}

class _AppSettingsPageState extends State<AppSettingsPage> {
  double marginRightContainerButton = 45;
  double marginLeftContainerButton = 0;
  MainAxisAlignment alignmentButtons = MainAxisAlignment.end;

  dynamic getPropertyAdjested(BuildContext context, dynamic property, dynamic valueBase, dynamic valueAdjusted){
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
    final fontSizeState = Provider.of<FontSizeState>(context);
    final lightDarkState = Provider.of<LightDarkState>(context);
    return ScaffoldBase(
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.only(top: 13),
          child: Center(
            child: Column(
              children: [
                RowButtonBack(lastRoute: '/settingsPage'),
                RowWithText(
                  textLabel: 'Configurações do Aplicativo',
                  fontWeight: FontWeight.bold,
                  fontSize: 20,
                  marginTop: 204 - (98 + 24 + 18 + 20 + 11 + 5),
                  marginLeft: 27,
                  marginBottom: 265 - 228,
                ),
                RowWithText(
                  textLabel: 'Alterar tamanho da fonte',
                  marginLeft: 30,
                  marginBottom: 323 - 283,
                ),
                Container(
                  margin: EdgeInsets.only(bottom: 5),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Container(
                        margin: EdgeInsets.only(left: 39,),
                        child: SvgPicture.asset('lib/icons/small_a.svg', width: Provider.of<FontSizeState>(context).fontSize, height: Provider.of<FontSizeState>(context).fontSize,),
                      ),
                      Container(
                        margin: EdgeInsets.only(right: 29),
                        child: SvgPicture.asset('lib/icons/big_a.svg', width: Provider.of<FontSizeState>(context).fontSize + 6, height: Provider.of<FontSizeState>(context).fontSize + 7,),
                      )
                    ],
                  ),
                ),
                Stack(
                  children: [
                    SliderTheme(
                      data: SliderTheme.of(context).copyWith(
                        thumbShape:
                            CustomSliderThumbIcon(), // Define o formato do thumb.
                      ),
                      child: SizedBox(
                        width: MediaQuery.of(context).size.width - 25,
                        child: Slider(
                          value: fontSizeState.fontSize,
                          min: 15,
                          max: 30,
                          divisions: 4,
                          label: fontSizeState.fontSize.toStringAsFixed(0),
                          onChanged: (value) {
                            fontSizeState.setFontSize(value);
                          },
                        ),
                      ),
                    ),
                    Positioned(
                        bottom: 16,
                        right: 25, // Coloca o ícone no final
                        child: SvgPicture.asset(
                          'lib/icons/end.svg',
                          height: 16,
                        )),
                  ],
                ),
                RowWithText(
                  textLabel: 'Alterar tema',
                  marginLeft: 30,
                  marginTop: 424 -370,
                  marginBottom: 470 - 442,
                ),
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    ContainerWithButton(
                      fontSize: Provider.of<FontSizeState>(context).fontSize,
                      widthAdjusted: 150, 
                      heightAdjusted: 60,
                      onPressed: () {
                        lightDarkState.setTema('dark');
                      },
                      width: 110,
                      height: 40,
                      labelText: 'escuro',
                      marginRight: 19,
                      icon: Icon(Icons.dark_mode, size: Provider.of<FontSizeState>(context).fontSize,),
                    ),
                    ContainerWithButton(
                      fontSize: Provider.of<FontSizeState>(context).fontSize,
                      onPressed: () {
                        lightDarkState.setTema('light');
                      },
                      widthAdjusted: 150,
                      heightAdjusted: 60,
                      width: 110,
                      height: 40,
                      labelText: 'claro',
                      color: Color(0xFF997C70),
                      icon: Icon(Icons.light_mode, size: Provider.of<FontSizeState>(context).fontSize),
                    ),
                  ],
                ),
                Row(
                  mainAxisAlignment: getPropertyAdjested(context, alignmentButtons, MainAxisAlignment.end, MainAxisAlignment.center),
                  children: [
                    Container(
                      margin: EdgeInsets.only(left: getPropertyAdjested(context, marginLeftContainerButton, 0.0, 10.0) ,right: getPropertyAdjested(context, marginRightContainerButton, 45.0, 0.0), top: 95),
                      child: Column(
                        children: [
                          ContainerWithButton(
                            fontSize: Provider.of<FontSizeState>(context).fontSize,
                            widthAdjusted: 300, 
                            heightAdjusted: 90, 
                            onPressed: () {},
                            width: 220,
                            height: 70,
                            labelText: 'Salvar configurações',
                            rectangleRoundedBorder: true,
                            marginBottom: 29,
                          ),
                          ContainerWithButton(
                            fontSize: Provider.of<FontSizeState>(context).fontSize,
                            widthAdjusted: 300, 
                            heightAdjusted: 90, 
                            onPressed: () {},
                            width: 220,
                            height: 70,
                            labelText: 'Resetar configurações',
                            rectangleRoundedBorder: true,
                            marginBottom: 40,
                          )
                        ],
                      ),
                    ),
                  ],
                )
              ],
            ),
          ),
        ),
      ),
    );
  }
}

class CustomSliderThumbIcon extends SliderComponentShape {
  @override
  Size getPreferredSize(bool isEnabled, bool isDiscrete) {
    return Size(24, 24); // Define o tamanho do "thumb".
  }

  @override
  void paint(
    PaintingContext context,
    Offset center, {
    required Animation<double> activationAnimation,
    required Animation<double> enableAnimation,
    required bool isDiscrete,
    required TextPainter labelPainter,
    required RenderBox parentBox,
    required Size sizeWithOverflow,
    required SliderThemeData sliderTheme,
    required TextDirection textDirection,
    required double textScaleFactor,
    required double value,
  }) {
    final canvas = context.canvas;

    // Desenha um ícone dentro do "thumb".
    final icon = Icons.adjust; // Substitua pelo ícone desejado.
    final textPainter = TextPainter(
      text: TextSpan(
        text: String.fromCharCode(icon.codePoint),
        style: TextStyle(
          fontSize: 24,
          fontFamily: icon.fontFamily,
          color: Colors.black,
        ),
      ),
      textDirection: textDirection,
    );
    textPainter.layout();
    textPainter.paint(
      canvas,
      Offset(center.dx - textPainter.width / 2,
          center.dy - textPainter.height / 2),
    );
  }
}
