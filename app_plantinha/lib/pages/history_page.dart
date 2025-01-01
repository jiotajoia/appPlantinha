import 'package:app_plantinha/widgets/scaffold_base.widget.dart';
import 'package:flutter/material.dart';

class HistoryPage extends StatefulWidget {
  const HistoryPage({super.key, required this.title});
  final String title;

  @override
  State<HistoryPage> createState() => _HistoryPageState();
}

class _HistoryPageState extends State<HistoryPage> {
  @override
  Widget build(BuildContext context) {
    return ScaffoldBase(
      title: "Histórico",
      iconAppBar1: PopupMenuButton(
        icon: Icon(Icons.more_vert, color: Colors.white,),
        itemBuilder: (context) => [
          PopupMenuItem(
            child: ListTile(
              enabled: false,
              leading: Icon(Icons.delete_forever),
              title: Text('Apagar Histórico'),
              onTap: () {
                Navigator.pop(context);
              },
            )
          ),
          PopupMenuItem(
            child: ListTile(
              enabled: false,
              leading: Icon(Icons.filter_list),
              title: Text('Filtrar Histórico'),
              onTap: () {
                Navigator.pop(context);
              },
            )
          )
        ],
      ),
    );
  }
}