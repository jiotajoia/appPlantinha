import 'package:app_plantinha/app_plantinha.dart';
import 'package:app_plantinha/configs/app.configs.dart';
import 'package:app_plantinha/controllers/provider/font_size.provider.dart';
import 'package:app_plantinha/controllers/provider/forgot_password_state.provider.dart';
import 'package:app_plantinha/controllers/provider/light_dark.provider.dart';
import 'package:app_plantinha/controllers/provider/nome.provider.dart';
import 'package:app_plantinha/controllers/provider/step_forgot_password_state.provider.dart';
import 'package:app_plantinha/firebase_options.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:camera/camera.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  final initialRoute = await AppConfigs.getLastRoute() ?? '/splashScreenPage';
  final cameras = await availableCameras();

  final firstCamera = cameras.first;

  Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );

  runApp(MultiProvider(providers: [
    ChangeNotifierProvider(create: (_) => NomeState()),
    ChangeNotifierProvider(create: (_) => ForgotPasswordState()),
    ChangeNotifierProvider(create: (_) => StepForgotPasswordState()),
    ChangeNotifierProvider(create: (_) => FontSizeState()),
    ChangeNotifierProvider(create: (_) => LightDarkState()),
  ], child: AppPlantinha(initialRoute: initialRoute, camera: firstCamera)));
}
