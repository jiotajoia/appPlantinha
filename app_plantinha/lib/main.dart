import 'package:app_plantinha/app_plantinha.dart';
import 'package:app_plantinha/configs/app.configs.dart';
import 'package:app_plantinha/provider/font_size.provider.dart';
import 'package:app_plantinha/provider/forgot_password_state.provider.dart';
import 'package:app_plantinha/provider/light_dark.provider.dart';
import 'package:app_plantinha/provider/step_forgot_password_state.provider.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

void main() async{
  WidgetsFlutterBinding.ensureInitialized();
  final initialRoute = await AppConfigs.getLastRoute() ?? '/splashScreenPage';

  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => ForgotPasswordState()), 
        ChangeNotifierProvider(create: (_) => StepForgotPasswordState()),
        ChangeNotifierProvider(create: (_) => FontSizeState()),
        ChangeNotifierProvider(create: (_) => LightDarkState()), 
      ],
      child: AppPlantinha(initialRoute: initialRoute,)
    )
  );
}
