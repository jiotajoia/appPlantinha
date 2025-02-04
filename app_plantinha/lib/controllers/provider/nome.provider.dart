import 'package:flutter/material.dart';

class NomeState extends ChangeNotifier {
  String _nome = 'Plantinha User'; 

  String get nome => _nome;

  void setNome(String newNome) {
    _nome = newNome;
    notifyListeners();  
  }
}
