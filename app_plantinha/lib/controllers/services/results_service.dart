import 'dart:convert';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:http/http.dart' as http;

class ResultsService {
  final String backExterno = "http://192.168.156.154:3000";
  final FirebaseAuth _auth = FirebaseAuth.instance;

  obterResultadoMapa(String pais) async {
    try {
      var response = await http.get(
        Uri.parse('$backExterno/user/resultado-mapa/$pais'),
      );
      
      if (response.statusCode != 200) {
        throw Exception(jsonDecode(response.body).error);
      }

      return jsonDecode(response.body);
    } catch (e) {
      rethrow;
    }
  }

  obterResultadoImagem(List<String> nomePlantas) async {
    try {
      User? user = _auth.currentUser;
      String idUser = user!.uid;
      
      var response = await http.post(
        Uri.parse('$backExterno/user/$idUser/imagem'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({
          'nomePlantas': nomePlantas,
        }),
      );

      return jsonDecode(response.body);
    } catch (e) {
      rethrow;
    }
  }
}