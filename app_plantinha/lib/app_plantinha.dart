import 'package:app_plantinha/view/pages/account_settings_page.dart';
import 'package:app_plantinha/view/pages/app_settings_page.dart';
import 'package:app_plantinha/view/pages/change_password_page.dart';
import 'package:app_plantinha/view/pages/forgot_password_page.dart';
import 'package:app_plantinha/view/pages/help_page.dart';
import 'package:app_plantinha/view/pages/history_page.dart';
import 'package:app_plantinha/view/pages/home_page.dart';
import 'package:app_plantinha/view/pages/search_by_image_page.dart';
import 'package:app_plantinha/view/pages/search_by_maps_page.dart';
import 'package:app_plantinha/view/pages/search_by_quiz_page.dart';
import 'package:app_plantinha/view/pages/signup_page.dart';
import 'package:app_plantinha/view/pages/settings_page.dart';
import 'package:app_plantinha/view/pages/login_page.dart';
import 'package:app_plantinha/view/pages/splash_screen_page.dart';
import 'package:app_plantinha/controllers/provider/font_size.provider.dart';
import 'package:app_plantinha/controllers/provider/light_dark.provider.dart';
import 'package:flutter/material.dart';
import 'package:camera/camera.dart';
import 'package:provider/provider.dart';

class AppPlantinha extends StatelessWidget {
  const AppPlantinha({super.key, required this.camera});

  final CameraDescription camera;

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      restorationScopeId: 'root',
      initialRoute: '/splashScreenPage',
      routes: {
        '/': (context) => const LoginPage(title: 'Login Page'),
        '/homePage': (context) => const HomePage(title: 'Home Page'),
        '/homePage/searchByQuizPage': (context) =>
            const SearchByQuizPage(title: 'Search By Quiz Page'),
        //'/homePage/searchByQuizPage/resultsPage': (context) => const ResultsScreen(title: 'Results Page'),
        '/homePage/searchByImagePage': (context) =>
            SearchByImagePage(title: 'Search By Image Page', camera: camera),
        '/homePage/searchByMapsPage': (context) => const SearchByMapsPage(),
        '/forgotPasswordPage': (context) =>
            const ForgotPasswordPage(title: 'Forgot Password Page'),
        '/signUpPage': (context) => const SignUpPage(title: 'SignUp Page'),
        '/settingsPage': (context) =>
            const SettingsPage(title: 'Settings Page'),
        '/settingsPage/accountSettingsPage': (context) =>
            const AccountSettingsPage(title: 'Account Settings Page'),
        '/settingsPage/accountSettingsPage/changePasswordPage': (context) =>
            const ChangePasswordPage(title: 'Change Password Page'),
        '/settingsPage/appSettingsPage': (context) =>
            const AppSettingsPage(title: 'App Settings Page'),
        '/helpPage': (context) => const HelpPage(title: 'Help Page'),
        '/historyPage': (context) => const HistoryPage(title: 'History Page'),
        '/splashScreenPage': (context) =>
            const SplashScreenPage(title: 'Splash Screen Page'),
      },
      title: 'Material App',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(
          seedColor: Color(0xFF8EB486),
          brightness: Provider.of<LightDarkState>(context).tema == 'light' ||
                  ModalRoute.of(context)?.settings.name == '/'
              ? Brightness.light
              : Brightness.dark,
          contrastLevel: 0,
        ),
        textTheme: TextTheme(
          bodyMedium: TextStyle(
              fontSize: Provider.of<FontSizeState>(context).fontSize,
              color: Provider.of<LightDarkState>(context).tema == 'light'
                  ? Colors.black
                  : Colors.white),
        ),
        elevatedButtonTheme: ElevatedButtonThemeData(
          style: ElevatedButton.styleFrom(
            backgroundColor: Color(0xFF685752),
            foregroundColor: Colors.white,
            textStyle: TextStyle(
              fontSize: 15,
            ),
          ),
        ),
        floatingActionButtonTheme: FloatingActionButtonThemeData(
          backgroundColor: Color(0xFF685752),
          foregroundColor: Colors.white,
          extendedTextStyle: TextStyle(
            fontSize: 15,
          ),
          extendedIconLabelSpacing: 10,
        ),
        appBarTheme: AppBarTheme(
          backgroundColor: Color(0xFF8EB486),
          iconTheme: IconThemeData(color: Colors.white),
          centerTitle: true,
          titleTextStyle: TextStyle(
              fontSize: 20, fontWeight: FontWeight.bold, color: Colors.white),
        ),
        listTileTheme: ListTileThemeData(
          textColor: Colors.white,
          iconColor: Colors.white,
        ),
      ),
    );
  }
}
