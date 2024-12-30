import 'package:app_plantinha/widgets/scaffoldBase.widget.dart';
import 'package:flutter/material.dart';

class HelpPage extends StatelessWidget {
  const HelpPage({super.key, required this.title});
  final String title;

  @override
  Widget build(BuildContext context) {
    return ScaffoldBase(
      title: "Ajuda",
    );
  }
}