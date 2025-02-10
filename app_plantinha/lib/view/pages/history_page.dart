import 'package:app_plantinha/view/widgets/card_history_page.dart';
import 'package:app_plantinha/view/widgets/row_button_back.widget.dart';
import 'package:app_plantinha/view/widgets/row_with_text.dart';
import 'package:app_plantinha/view/widgets/scaffold_base.widget.dart';
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
    double screenWidth = MediaQuery.of(context).size.width;
    double screenHeight = MediaQuery.of(context).size.height;
    DateTime dataAtual = DateTime.now();

    List<Map<String, dynamic>> resultsValues = [
      {'data': '2025-02-03'},
      {'data': '2025-08-03'},
      {'data': '2025-02-03'},
      {'data': '2025-01-01'},
    ];

    bool isDiaAnterior(DateTime data) {
      DateTime atual = DateTime.now();

      DateTime umDiasAtras = atual.subtract(Duration(days: 1));
      DateTime seisDiasAtras = atual.subtract(Duration(days: 6));

      return data.isBefore(umDiasAtras) && data.isBefore(seisDiasAtras);
    }

    bool isSemanaAnterior(DateTime data) {
      DateTime agora = DateTime.now();
      DateTime seteDiasAtras = agora.subtract(Duration(days: 7));
      DateTime trintaUmDiasAtras = agora.subtract(Duration(days: 31));

      return data.isBefore(seteDiasAtras) && data.isAfter(trintaUmDiasAtras);
    }

    bool isMesAnterior(DateTime data) {
      DateTime agora = DateTime.now();
      DateTime mesAtras = agora.subtract(Duration(days: 32));

      return data.isBefore(mesAtras);
    }

    dynamic createCardHistory(BuildContext context) {
      
      for (var result in resultsValues) {
        DateTime data = DateTime.parse(result['data']);
        if (data == dataAtual) {}

        if (isDiaAnterior(data)) {}

        if (isSemanaAnterior(data)) {}

        if (isMesAnterior(data)) {}
      }

      CardHistoryPage(
        text: 'Quiz Sobre planta ${1}',
      );

      Divider(
        color: Colors.transparent,
        thickness: 0,
        height: 10.0,
      );
    }

    return ScaffoldBase(
      title: "Histórico",
      iconAppBar1: PopupMenuButton(
        icon: Icon(
          Icons.more_vert,
          color: Colors.white,
        ),
        itemBuilder: (context) => [
          PopupMenuItem(
              child: ListTile(
            enabled: false,
            leading: Icon(Icons.delete_forever),
            title: Text('Apagar Histórico'),
            onTap: () {
              Navigator.pop(context);
            },
          )),
          PopupMenuItem(
              child: ListTile(
            enabled: false,
            leading: Icon(Icons.filter_list),
            title: Text('Filtrar Histórico'),
            onTap: () {
              Navigator.pop(context);
            },
          ))
        ],
      ),
      body: Padding(
        padding: EdgeInsets.only(top: screenHeight * 0.03),
        child: SingleChildScrollView(
          child: Column(
            children: [
              RowButtonBack(), 

              
            ],
          ),
        ),
      ),
    );
  }
}
