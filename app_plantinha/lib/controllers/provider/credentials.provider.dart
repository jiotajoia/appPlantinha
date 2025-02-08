import 'package:flutter/material.dart';

class CredentialsState extends ChangeNotifier {
  String _nome = 'Plantinha User'; 
  String _email = 'plantinhauser@gmail.com'; 

  String get nome => _nome;
  String get email => _email;

  void setNome(String newNome) {
    _nome = newNome;
    notifyListeners();  
  }
  
  void setEmail(String newEmail) {
    _email = newEmail;
    notifyListeners();  
  }
}