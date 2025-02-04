import 'package:flutter/material.dart';

class LightDarkState extends ChangeNotifier{
  String _tema = 'light';

  String get tema => _tema;

  void setTema(String novoTema){
    _tema = novoTema;
    notifyListeners();
  }

  void resetTema(){
    _tema = 'light';
    notifyListeners();
  }
}