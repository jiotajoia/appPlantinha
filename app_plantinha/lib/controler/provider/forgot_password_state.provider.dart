import 'package:flutter/material.dart';

class ForgotPasswordState extends ChangeNotifier{
  String _email = '';

  String get email => _email;

  void updateEmail(String email){
    _email = email;
    notifyListeners();
  }
}