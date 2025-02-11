import 'dart:convert';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:http/http.dart' as http;

class ResultsService {
  final String backExterno = "http://192.168.1.4:3000";
  final FirebaseAuth _auth = FirebaseAuth.instance;

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

  obterResultadoImagem(List<String> nomePlantas) async {
    try {
      User? user = _auth.currentUser;
      String idUser = user!.uid;
      var response = await http.post(
        Uri.parse('$backExterno/user/$idUser/imagem'),
      );

      return jsonDecode(response.body).resultado;
    } catch (e) {
      rethrow;
    }
  }
}
