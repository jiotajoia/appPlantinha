import 'package:app_plantinha/app_plantinha.dart';
import 'package:app_plantinha/configs/app.configs.dart';
import 'package:flutter/material.dart';

void main() async{
  WidgetsFlutterBinding.ensureInitialized();
  final initialRoute = await AppConfigs.getLastRoute() ?? '/';

  runApp(AppPlantinha(initialRoute: initialRoute,));
}
