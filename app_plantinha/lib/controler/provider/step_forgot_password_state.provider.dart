import 'package:flutter/material.dart';

class StepForgotPasswordState extends ChangeNotifier{
  int _currentStep = 0;

  int get currentStep => _currentStep;

  void incrementCurrentStep(){
    _currentStep++;
    notifyListeners();
  }

  void resetCurrentStep(){
    _currentStep = 0;
    notifyListeners();
  }
} 