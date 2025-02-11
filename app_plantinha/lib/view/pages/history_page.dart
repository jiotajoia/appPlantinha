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
    double screenHeight = MediaQuery.of(context).size.height;
    List<Map<String, dynamic>> resultsValues = [
      {'data': '2025-02-03'},
      {'data': '2025-08-03'},
      {'data': '2025-02-03'},
      {'data': '2025-01-01'},
    ];

    bool isHoje(DateTime data) {
      DateTime agora = DateTime.now();
      return agora == data;
    }

    bool isDiaAnterior(DateTime data) {
      DateTime agora = DateTime.now();
      DateTime ontem = agora.subtract(Duration(days: 1));
      DateTime seisDiasAtras = agora.subtract(Duration(days: 6));

      return data.isBefore(ontem) && data.isAfter(seisDiasAtras);
    }

    bool isSemanaAnterior(DateTime data) {
      DateTime agora = DateTime.now();
      DateTime seteDiasAtras = agora.subtract(Duration(days: 7));
      DateTime trintaUmDiasAtras = agora.subtract(Duration(days: 31));

      return data.isBefore(seteDiasAtras) && data.isAfter(trintaUmDiasAtras);
    }

    bool isMesAnterior(DateTime data) {
      DateTime agora = DateTime.now();
      DateTime maisDeUmMesAtras = agora.subtract(Duration(days: 31));

      return data.isBefore(maisDeUmMesAtras);
    }

    Widget createCardHistory(BuildContext context) {
      List<Map<String, dynamic>> hojeList = [];
      List<Map<String, dynamic>> diasList = [];
      List<Map<String, dynamic>> semanasList = [];
      List<Map<String, dynamic>> mesesList = [];

      for (var i = 0; i < resultsValues.length; i++) {
        var result = resultsValues[i];
        DateTime data = DateTime.parse(result['data']);
        if (isHoje(data)) {
          hojeList.add({'index': i + 1, 'data': result['data']});
        } else if (isDiaAnterior(data)) {
          diasList.add({'index': i + 1, 'data': result['data']});
        } else if (isSemanaAnterior(data)) {
          semanasList.add({'index': i + 1, 'data': result['data']});
        } else if (isMesAnterior(data)) {
          mesesList.add({'index': i + 1, 'data': result['data']});
        }
      }

      List<Widget> buildSection(
          String title, List<Map<String, dynamic>> dataList) {
        if (dataList.isEmpty) return [];

        return [
          RowWithText(textLabel: title),
          ...dataList.map((data) => CardHistoryPage(
                text: 'Quiz sobre planta - ${data['index']}',
              )),
          Divider(color: Colors.transparent, thickness: 0, height: 10.0),
        ];
      }

      return Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          ...buildSection("Hoje", hojeList),
          ...buildSection("Há dias atrás", diasList),
          ...buildSection("Há semanas atrás", semanasList),
          ...buildSection("Há meses atrás", mesesList),
        ],
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
              createCardHistory(context),
            ],
          ),
        ),
      ),
    );
  }
}