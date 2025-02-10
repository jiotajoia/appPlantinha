import 'dart:convert';
import 'dart:core';
import 'dart:io';
import 'package:http/http.dart' as http;
import 'package:flutter_dotenv/flutter_dotenv.dart';

String apiKey = dotenv.env['API_KEY'] ?? 
    (throw Exception("API_KEY não encontrada no .env"));

Future <List<String>> identifyPlant(File imageFile) async {
  // Converte a imagem para base64
  List<int> imageBytes = await imageFile.readAsBytes();
  String base64Image = base64Encode(imageBytes);

  var requestBody = {
    "images": [base64Image],
  };

  var response = await http.post(
    Uri.parse("https://api.plant.id/v3/identification"),
    headers: {
      "Api-Key": apiKey,
      "Content-Type": "application/json",
    },
    body: jsonEncode(requestBody),
  );

  if (response.statusCode == 201) {
    var data = jsonDecode(response.body);
    List<String> plantNames = (data['result']['classification']['suggestions'] as List)
    .take(4)
    .map((suggestion) => suggestion['name'] as String)
    .toList();

    return plantNames;
    
  } else {
    throw Exception("Erro ao identificar planta: ${response.body}");
  }
}
