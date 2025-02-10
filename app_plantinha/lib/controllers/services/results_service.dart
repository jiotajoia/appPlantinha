import 'dart:convert';

import 'package:http/http.dart' as http;

class ResultsService {
  final String backExterno = "http://192.168.1.4:3000";

  obterResultadoMapa(String pais) async {
    try {
      var response = await http.post(
        Uri.parse('$backExterno/user/resultado-mapa/$pais'),
      );

      return jsonDecode(response.body).resultado;

    } catch (e) {
      rethrow;
    }
  }
}