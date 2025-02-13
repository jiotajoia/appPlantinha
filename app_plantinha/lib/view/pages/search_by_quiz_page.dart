import 'package:app_plantinha/controllers/provider/font_size.provider.dart';
import 'package:app_plantinha/controllers/provider/light_dark.provider.dart';
import 'package:app_plantinha/controllers/services/results_service.dart';
import 'package:app_plantinha/view/pages/results_screen.dart';
import 'package:app_plantinha/view/widgets/container_with_button.widget.dart';
import 'package:app_plantinha/view/widgets/row_button_back.widget.dart';
import 'package:app_plantinha/view/widgets/row_with_text.dart';
import 'package:app_plantinha/view/widgets/scaffold_base.widget.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:app_plantinha/controllers/services/quiz_service.dart';

class SearchByQuizPage extends StatefulWidget {
  const SearchByQuizPage({super.key, required this.title});
  final String title;

  @override
  State<SearchByQuizPage> createState() => _SearchByQuizPageState();
}

class _SearchByQuizPageState extends State<SearchByQuizPage> {
  final QuizService quizService = QuizService();
  final ResultsService resultsService = ResultsService();
  
  Map<String, dynamic> perguntaAtual = {};
  Map<String, dynamic> respostasQuiz = {};

  List<Map<String, dynamic>> answers = [
    {
      "isChecked": false,
      "answer": "sim"
    },
    {"isChecked": false, "answer": "não"},
    {"isChecked": false, "answer": "talvez"},
  ];

  int counter = 1;

  void incrementCounter() {
    setState(() {
      counter++;
    });
  }

  obterPergunta(String id) async{
      perguntaAtual = await quizService.obterPergunta(id);
      setState((){
      });
  }

  @override
  void initState() {
    super.initState();
    obterPergunta('01');
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
              RowButtonBack(),
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
                textLabel: '$counter. ${perguntaAtual['indagacao']}',
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
                onPressed: () async {
                  int indexAlternativa = 0;
                  for (var answer in answers) {
                    if(answer["isChecked"] == true){
                      goToNextQuestion = true;
                      respostasQuiz['${perguntaAtual['filtro']}'] = '${perguntaAtual['alternativas'][indexAlternativa]}';
                      print(respostasQuiz);
                      break; 
                    }else{
                      indexAlternativa++;
                    }
                  }

                  if(goToNextQuestion == true){
                    incrementCounter();
                    obterPergunta(perguntaAtual['indicacao'][indexAlternativa]);
                    setState(() {
                      for (var answer in answers) {
                        answer["isChecked"] = false;
                      }
                      goToNextQuestion = false;
                      
                    });
                  }

                  if(counter > 6){
                    showDialog(
                        context: context,
                        barrierDismissible: false,
                        builder: (_) => const Center(child: CircularProgressIndicator()),
                        );
                      try{
                        var resultado = await resultsService.obterResultadoQuiz(respostasQuiz);
                    // ignore: use_build_context_synchronously
                         Navigator.pop(context);
                          Navigator.push(context,MaterialPageRoute(builder: (context) => ResultsScreen(title: 'Results Page',resultado: resultado,),),);
                      }catch(e){
                        Navigator.pop(context); // Fecha o loading
                        ScaffoldMessenger.of(context).showSnackBar(
                          SnackBar(
                            content: Text('Erro ao criar resultado: $e'),
                            duration: const Duration(seconds: 20),
                          ),
                        );
                      }
                    
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