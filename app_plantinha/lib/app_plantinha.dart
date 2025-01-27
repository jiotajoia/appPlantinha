import 'package:app_plantinha/configs/app.configs.dart';
import 'package:app_plantinha/view/pages/account_settings_page.dart';
import 'package:app_plantinha/view/pages/app_settings_page.dart';
import 'package:app_plantinha/view/pages/change_password_page.dart';
import 'package:app_plantinha/view/pages/forgot_password_page.dart';
import 'package:app_plantinha/view/pages/help_page.dart';
import 'package:app_plantinha/view/pages/history_page.dart';
import 'package:app_plantinha/view/pages/home_page.dart';
import 'package:app_plantinha/view/pages/results_screen.dart';
import 'package:app_plantinha/view/pages/search_by_image_page.dart';
import 'package:app_plantinha/view/pages/search_by_quiz_page.dart';
import 'package:app_plantinha/view/pages/signup_page.dart';
import 'package:app_plantinha/view/pages/settings_page.dart';
import 'package:app_plantinha/view/pages/login_page.dart';
import 'package:app_plantinha/view/pages/splash_screen_page.dart';
import 'package:app_plantinha/controler/provider/font_size.provider.dart';
import 'package:app_plantinha/controler/provider/light_dark.provider.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';

class AppPlantinha extends StatelessWidget {
  const AppPlantinha({super.key, required this.initialRoute});
  final String initialRoute;

  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      restorationScopeId: 'root',
      routerConfig: GoRouter(
      restorationScopeId: 'root',
      initialLocation: initialRoute, 
      routes: <RouteBase>[
        GoRoute(
            path: '/',
            builder: (BuildContext context, GoRouterState state) {
              return const LoginPage(
                title: 'Login Page',
              );
            }, routes: <RouteBase> [
              GoRoute(
                path: 'homePage',
                builder: (BuildContext context, GoRouterState state){
                  return const HomePage(title: 'Home Page');
                },
                routes: <RouteBase> [
                  GoRoute(
                    path: 'searchByQuizPage',
                    builder: (BuildContext context, GoRouterState state){
                      return const SearchByQuizPage(title: 'Search By Quiz Page');
                    },
                    routes: <RouteBase>[
                      GoRoute(
                        path: 'resultsPage',
                        builder: (BuildContext context, GoRouterState state){
                          return const ResultsScreen(title: 'Results Page');
                        }
                      )
                    ]
                  ),
                  GoRoute(
                    path: 'searchByImagePage',
                    builder: (BuildContext context, GoRouterState state){
                      return const SearchByImagePage(title: 'Search By Image Page');
                    }
                  )
                ]
              ),
              GoRoute(
                path: 'forgotPasswordPage',
                builder: (BuildContext context, GoRouterState state){
                  return const ForgotPasswordPage(title: 'Forgot Password Page');
                },
              ),
              GoRoute(
                path: 'signUpPage',
                builder: (BuildContext context, GoRouterState state){
                  return const SignUpPage(title: 'SignUp Page');
                },
              ),

            ] 
            ),
        GoRoute(
          path: '/settingsPage',
          builder: (BuildContext context, GoRouterState state) {
            return const SettingsPage(
              title: 'Settings Page',
            );
          },
          routes: <RouteBase>[
            GoRoute(
                path: 'accountSettingsPage',
                builder: (BuildContext context, GoRouterState state) {
                  return const AccountSettingsPage(
                    title: 'Account Settings Page',
                  );
                },
                routes: <RouteBase>[
                  GoRoute(
                    path: 'changePasswordPage',
                    builder: (BuildContext context, GoRouterState state){
                      return const ChangePasswordPage(
                        title: 'Change Password Page',
                      );
                    }
                  ),  
                ]
            ),
            GoRoute(
                path: 'appSettingsPage',
                builder: (BuildContext context, GoRouterState state) {
                  return const AppSettingsPage(
                    title: 'App Settings Page',
                  );
                }
            ),
          ],
        ),
        GoRoute(
            path: '/helpPage',
            builder: (BuildContext context, GoRouterState state) {
              return const HelpPage(title: 'Help Page');
            }),
        GoRoute(
            path: '/historyPage',
            builder: (BuildContext context, GoRouterState state) {
              return const HistoryPage(title: 'History Page');
            }),
        GoRoute(
            path: '/splashScreenPage',
            builder: (BuildContext context, GoRouterState state) {
              return const SplashScreenPage(title: 'Splash Screen Page');
            })
      ]),
      title: 'Material App',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(
          seedColor: Color(0xFF8EB486),
          brightness: Provider.of<LightDarkState>(context).tema == 'light' || AppConfigs.getLastRoute() == '/' ? Brightness.light : Brightness.dark,
          contrastLevel: 0,
        ),

        textTheme: TextTheme(
          bodyMedium: TextStyle(fontSize: Provider.of<FontSizeState>(context).fontSize, color: Provider.of<LightDarkState>(context).tema == 'light' ? Colors.black : Colors.white),
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