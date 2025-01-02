import 'package:app_plantinha/widgets/row_button_back.widget.dart';
import 'package:app_plantinha/widgets/scaffold_base.widget.dart';
import 'package:flutter/material.dart';

class SearchByQuizPage extends StatelessWidget {
  const SearchByQuizPage({super.key, required this.title});
  final String title;

  @override
  Widget build(BuildContext context) {
    return ScaffoldBase(
      body: Padding(
        padding: EdgeInsets.only(top: 3,),
        child: Center(
          child: Column(
            children: [
              RowButtonBack(lastRoute: '/homePage'),
            ],
          ),
        ), 
      ),
    );
  }
}