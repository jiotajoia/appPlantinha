import 'package:flutter/material.dart';

class FontSizeState extends ChangeNotifier {
  double _fontSize = 30; // Tamanho inicial da fonte.

  double get fontSize => _fontSize;

  void setFontSize(double newSize) {
    _fontSize = newSize;
    notifyListeners(); // Notifica os widgets consumidores.
  }

  void resetFontSize(){
    _fontSize = 15;
    notifyListeners();
  }
}
