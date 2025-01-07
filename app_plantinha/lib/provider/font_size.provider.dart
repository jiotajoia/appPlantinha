import 'package:flutter/material.dart';

class FontSizeState extends ChangeNotifier {
  double _fontSize = 21; 

  double get fontSize => _fontSize;

  void setFontSize(double newSize) {
    _fontSize = newSize;
    notifyListeners(); 
  }

  void resetFontSize(){
    _fontSize = 21;
    notifyListeners();
  }
}
