import 'package:app_plantinha/configs/app.configs.dart';
import 'package:app_plantinha/provider/font_size.provider.dart';
import 'package:app_plantinha/provider/light_dark.provider.dart';
import 'package:app_plantinha/widgets/container_with_button.widget.dart';
import 'package:app_plantinha/widgets/row_button_back.widget.dart';
import 'package:app_plantinha/widgets/row_with_text.dart';
import 'package:app_plantinha/widgets/scaffold_base.widget.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';

class SearchByQuizPage extends StatefulWidget {
  const SearchByQuizPage({super.key, required this.title});
  final String title;

  @override
  State<SearchByQuizPage> createState() => _SearchByQuizPageState();
}

class _SearchByQuizPageState extends State<SearchByQuizPage> {
  List<Map<String, dynamic>> answers = [
    {
      "isChecked": false,
      "answer": "simosdfvewrvwemkrgpwk4toigj3poitjbgpoi53jtbpoi35juibdig"
    },
    {"isChecked": false, "answer": "sim"},
    {"isChecked": false, "answer": "sim"},
    {"isChecked": false, "answer": "não"}
  ];
  int counter = 1;

  void incrementCounter() {
    setState(() {
      counter++;
    });
  }

  @override
  Widget build(BuildContext context) {
    bool goToNextQuestion = false;
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
          child: Column(
            children: [
              RowButtonBack(lastRoute: '/homePage'),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text('Quiz'),
                  Icon(Icons.quiz_outlined),
                ],
              ),
              RowWithText(
                marginTop: heightScreen * 0.067,
                marginBottom: heightScreen * 0.040,
                textLabel: '$counter. É uma planta?',
                mainAxisAlignment: MainAxisAlignment.center,
                fontWeight: FontWeight.bold,
                fontSize: fontSizeProvider + 5,
              ),
              ...answers.map((data) {
                return SingleChildScrollView(
                  child: IntrinsicHeight(
                    child: Container(
                      width: widthScreen * 0.84,
                      margin: EdgeInsets.only(
                          top: heightScreen * 0.0067,
                          bottom: heightScreen * 0.0067),
                      color: Colors.transparent,
                      child: ElevatedButton.icon(
                          style: ButtonStyle(
                              alignment: Alignment.centerLeft,
                              shadowColor:
                                  WidgetStateProperty.all(Colors.transparent),
                              iconColor: WidgetStateProperty.all(
                                  themeProvider == "light"
                                      ? Colors.black
                                      : Colors.white),
                              backgroundColor:
                                  WidgetStateProperty.all(Colors.transparent)),
                          icon: data["isChecked"] == true
                              ? Icon(
                                  Icons.radio_button_checked,
                                  size: fontSizeProvider,
                                )
                              : Icon(
                                  Icons.radio_button_unchecked,
                                  size: fontSizeProvider,
                                ),
                          onPressed: () {
                            setState(() {
                              if (data["isChecked"] == false) {
                                for (var answer in answers) {
                                  if (answer["isChecked"] == true) {
                                    answer["isChecked"] = false;
                                  }
                                }
                                data["isChecked"] = true;
                              } else {
                                data["isChecked"] = false;
                              }
                            });
                          },
                          label: Flexible(
                              child: Text(
                            data["answer"],
                            style: TextStyle(
                                fontSize: fontSizeProvider + 1,
                                color: themeProvider == "light"
                                    ? Colors.black
                                    : Colors.white,
                                ),
                          ))),
                    ),
                  ),
                );
              }),
              ContainerWithButton(
                onPressed: () {
                  for (var answer in answers) {
                    if(answer["isChecked"] == true){
                      goToNextQuestion = true;
                    }
                  }

                  if(goToNextQuestion == true){
                    incrementCounter();
                    setState(() {
                      for (var answer in answers) {
                        answer["isChecked"] = false;
                      }
                      goToNextQuestion = false;
                    });
                  }

                  if(counter == 3){
                    AppConfigs.saveLastRoute('/homePage/searchByQuizPage/ResultsPage');
                    context.push('/homePage/searchByQuizPage/ResultsPage');
                  }
                  
                },
                widthAdjusted: widthScreen * 0.436,
                width: widthScreen * 0.313,
                height: heightScreen * 0.052,
                heightAdjusted: heightScreen * 0.067,
                rectangleRoundedBorder: true,
                labelText: 'Próxima',
                fontWeight: FontWeight.bold,
                fontSize: fontSizeProvider + 1,
                marginTop: heightScreen * 0.067,
              )
            ],
          ),
        ),
      ),
    );
  }
}