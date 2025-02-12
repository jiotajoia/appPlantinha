import 'dart:convert';
import 'package:http/http.dart' as http;

class QuizService {
  final String backExterno = "http://192.168.156.154:3000";
  
  obterPergunta(String id) async {
    try {
      var response = await http.get(
        Uri.parse('$backExterno/pergunta/$id'),
      );

      return jsonDecode(response.body);
    } catch (e) {
      rethrow;
    }
  }
}