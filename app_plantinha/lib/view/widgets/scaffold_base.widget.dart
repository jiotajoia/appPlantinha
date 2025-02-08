import 'package:app_plantinha/controllers/provider/font_size.provider.dart';
import 'package:app_plantinha/view/widgets/drawer_base.widget.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class ScaffoldBase extends StatefulWidget {
  const ScaffoldBase({super.key, this.title, this.body, this.iconAppBar1});
  final String? title;
  final Widget? body;
  final Widget? iconAppBar1;
  @override
  State<ScaffoldBase> createState() => _ScaffoldBaseState();
}

class _ScaffoldBaseState extends State<ScaffoldBase> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        automaticallyImplyLeading: false,
        title: Text(widget.title ?? "AppPlantinha", style: TextStyle(fontSize: Provider.of<FontSizeState>(context).fontSize + 1),),
        actions: [
          if (widget.iconAppBar1 != null) widget.iconAppBar1!,
        ],
      ),
      drawer: DrawerBase(),
      body: widget.body
    );
  }
}