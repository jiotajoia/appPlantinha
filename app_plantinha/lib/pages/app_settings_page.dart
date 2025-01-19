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
  
  dynamic fontSizeState;
  dynamic lightDarkState;
  late String temaSelecionado;
  late double fonteSelecionado;

  @override
  void initState(){
    super.initState();
    fontSizeState = Provider.of<FontSizeState>(context,listen: false);
    lightDarkState = Provider.of<LightDarkState>(context,listen: false);
    
    temaSelecionado = lightDarkState.tema;
    fonteSelecionado = fontSizeState.fontSize;
  }

  dynamic getPropertyAdjusted(BuildContext context, dynamic property, dynamic valueBase, dynamic valueAdjusted){
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
      body: SingleChildScrollView(
        child: Padding(
          padding: EdgeInsets.only(top: heightScreen * 0.017),
          child: Center(
            child: Column(
              children: [
                RowButtonBack(lastRoute: '/settingsPage'),
                RowWithText(
                  textLabel: 'Configurações do Aplicativo',
                  fontWeight: FontWeight.bold,
                  fontSize: Provider.of<FontSizeState>(context).fontSize + 5,
                  marginTop: heightScreen * 0.038,
                  marginLeft: widthScreen * 0.065,
                  marginBottom: heightScreen * 0.05,
                ),
                RowWithText(
                  fontSize: Provider.of<FontSizeState>(context).fontSize,
                  textLabel: 'Alterar tamanho da fonte',
                  marginLeft: widthScreen * 0.072,
                  marginBottom: heightScreen * 0.054,
                ),
                Container(
                  margin: EdgeInsets.only(bottom: heightScreen * 0.006),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Container(
                        margin: EdgeInsets.only(left: widthScreen * 0.094,),
                        child: lightDarkState.tema == 'light' ? 
                        SvgPicture.asset('lib/icons/small_a.svg',
                          width: fontSizeState.fontSize, 
                          height: fontSizeState.fontSize,
                        ) : 
                        SvgPicture.asset('lib/icons/small_a_white.svg',
                          width: fontSizeState.fontSize, 
                          height: fontSizeState.fontSize,
                        )
                      ),
                      Container(
                        margin: EdgeInsets.only(right: widthScreen * 0.07),
                        child: Provider.of<LightDarkState>(context).tema == 'light' ? 
                        SvgPicture.asset('lib/icons/big_a.svg',
                          width: fontSizeState.fontSize + 7, 
                          height: fontSizeState.fontSize + 7,
                        ) : 
                        SvgPicture.asset('lib/icons/big_a_white.svg',
                          width: fontSizeState.fontSize + 7, 
                          height: fontSizeState.fontSize + 7,
                        ),
                      )
                    ],
                  ),
                ),
                Stack(
                  children: [
                    SliderTheme(
                      data: SliderTheme.of(context).copyWith(
                        thumbShape:
                            CustomSliderThumbIcon(lightDarkState.tema == 'light' ? Colors.black : Colors.white), // Define o formato do thumb.
                      ),
                      child: SizedBox(
                        width: widthScreen - widthScreen * 0.06068,
                        child: Slider(
                          value: fonteSelecionado,
                          min: 15,
                          max: 30,
                          divisions: 4,
                          label: fonteSelecionado.toStringAsFixed(0),
                          onChanged: (value) {
                            setState(() {
                              fonteSelecionado = value;
                            });
                          },
                        ),
                      ),
                    ),
                    Positioned(
                        bottom: 16,
                        right: 25, // Coloca o ícone no final
                        child: lightDarkState.tema == 'light' ? 
                        SvgPicture.asset(
                          'lib/icons/end.svg',
                          height: 16,
                        ) :
                        SvgPicture.asset(
                          'lib/icons/white_end.svg',
                          height: 16,
                        )
                    ),
                  ],
                ),
                RowWithText(
                  textLabel: 'Alterar tema',
                  marginLeft: widthScreen * 0.072,
                  marginTop: heightScreen * 0.073,
                  marginBottom: heightScreen * 0.038,
                  fontSize: Provider.of<FontSizeState>(context).fontSize,
                ),
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    ContainerWithButton(
                      fontSize: Provider.of<FontSizeState>(context).fontSize,
                      color: temaSelecionado == "dark" ? Color(0xFF685752): Color(0xFF997C70),
                      widthAdjusted: widthScreen * 0.364, 
                      heightAdjusted: heightScreen * 0.081,
                      onPressed: () {
                        setState(() {
                          temaSelecionado = 'dark';
                        });
                      },
                      width: widthScreen * 0.266,
                      height: heightScreen * 0.054,
                      labelText: 'escuro',
                      marginRight: widthScreen * 0.046,
                      icon: Icon(Icons.dark_mode, size: Provider.of<FontSizeState>(context).fontSize,),
                    ),
                    ContainerWithButton(
                      fontSize: Provider.of<FontSizeState>(context).fontSize,
                      onPressed: () {
                        setState(() {
                          temaSelecionado = 'light';
                        });
                      },
                      widthAdjusted: widthScreen * 0.364, 
                      heightAdjusted: heightScreen * 0.081,
                      width: widthScreen * 0.266,
                      height: heightScreen * 0.054,
                      labelText: 'claro',
                      color: temaSelecionado == "light" ? Color(0xFF685752): Color(0xFF997C70),
                      icon: Icon(Icons.light_mode, size: Provider.of<FontSizeState>(context).fontSize),
                    ),
                  ],
                ),
                Row(
                  mainAxisAlignment: getPropertyAdjusted(context, alignmentButtons, MainAxisAlignment.end, MainAxisAlignment.center),
                  children: [
                    Container(
                      margin: EdgeInsets.only(left: getPropertyAdjusted(context, marginLeftContainerButton, 0.0, 10.0) ,right: getPropertyAdjusted(context, marginRightContainerButton, 45.0, 0.0), top: 95),
                      child: Column(
                        children: [
                          ContainerWithButton(
                            fontSize: Provider.of<FontSizeState>(context).fontSize,
                            widthAdjusted: widthScreen * 0.728, 
                            heightAdjusted: heightScreen * 0.122, 
                            onPressed: () {
                              setState(() {
                                lightDarkState.setTema(temaSelecionado);
                                fontSizeState.setFontSize(fonteSelecionado);
                              });
                            },
                            width: widthScreen * 0.533,
                            height: heightScreen * 0.095,
                            labelText: 'Salvar configurações',
                            rectangleRoundedBorder: true,
                            marginBottom: heightScreen * 0.039,
                          ),
                          ContainerWithButton(
                            fontSize: Provider.of<FontSizeState>(context).fontSize,
                            widthAdjusted: widthScreen * 0.728, 
                            heightAdjusted: heightScreen * 0.122, 
                            onPressed: () {
                              lightDarkState.resetTema();
                              fontSizeState.resetFontSize();
                            },
                            width: widthScreen * 0.533,
                            height: heightScreen * 0.095,
                            labelText: 'Resetar configurações',
                            rectangleRoundedBorder: true,
                            marginBottom: heightScreen * 0.054,
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
  const CustomSliderThumbIcon(this.color);
  final Color color;
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
              color: color,
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
