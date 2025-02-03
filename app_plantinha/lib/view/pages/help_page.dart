import 'package:app_plantinha/view/widgets/scaffold_base.widget.dart';
import 'package:flutter/material.dart';

class HelpPage extends StatefulWidget {
  const HelpPage({super.key, required this.title});
  final String title;

  @override
  State<HelpPage> createState() => _HelpPageState();
}

class _HelpPageState extends State<HelpPage> {
  @override
  Widget build(BuildContext context) {
    return ScaffoldBase(
      title: "Ajuda",
    );
  }
}