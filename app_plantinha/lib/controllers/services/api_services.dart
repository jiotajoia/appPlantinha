import 'dart:convert';
import 'dart:io';
import 'package:http/http.dart' as http;
import 'package:flutter_dotenv/flutter_dotenv.dart';

String apiKey = dotenv.env[API_KEY];

Future<String> identifyPlant(File imageFile) async {
  // Converte a imagem para base64
  List<int> imageBytes = await imageFile.readAsBytes();
  String base64Image = base64Encode(imageBytes);

  var requestBody = {
    "images": [base64Image], // ou "flower", "fruit", etc., dependendo da imagem
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
    String plantName =
          data['result']['classification']['suggestions'][0]['name'];
      return plantName;
    
  } else {
    throw Exception("Erro ao identificar planta: ${response.body}");
  }
}
