import 'package:app_plantinha/app_plantinha.dart';
import 'package:app_plantinha/controllers/provider/font_size.provider.dart';
import 'package:app_plantinha/controllers/provider/forgot_password_state.provider.dart';
import 'package:app_plantinha/controllers/provider/light_dark.provider.dart';
import 'package:app_plantinha/controllers/provider/credentials.provider.dart';
import 'package:app_plantinha/controllers/provider/step_forgot_password_state.provider.dart';
import 'package:app_plantinha/firebase_options.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:camera/camera.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';

void main() async {
  await dotenv.load();
  WidgetsFlutterBinding.ensureInitialized();
  final cameras = await availableCameras();
  
  final firstCamera = cameras.first;

  Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );

  runApp(MultiProvider(providers: [
<<<<<<< Updated upstream
    ChangeNotifierProvider(create: (_) => CredentialsState()),
    ChangeNotifierProvider(create: (_) => ForgotPasswordState()),
    ChangeNotifierProvider(create: (_) => StepForgotPasswordState()),
    ChangeNotifierProvider(create: (_) => FontSizeState()),
    ChangeNotifierProvider(create: (_) => LightDarkState()),
=======
    ChangeNotifierProvider (create: (_) => NomeState()),
    ChangeNotifierProvider (create: (_) => ForgotPasswordState()),
    ChangeNotifierProvider (create: (_) => StepForgotPasswordState()),
    ChangeNotifierProvider (create: (_) => FontSizeState()),
    ChangeNotifierProvider (create: (_) => LightDarkState()),
>>>>>>> Stashed changes
  ], child: AppPlantinha(camera: firstCamera)));
}