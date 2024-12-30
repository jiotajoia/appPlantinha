import 'package:app_plantinha/pages/help_page.dart';
import 'package:app_plantinha/pages/history_page.dart';
import 'package:app_plantinha/pages/home_page.dart';
import 'package:app_plantinha/pages/logout_page.dart';
import 'package:app_plantinha/pages/settings_page.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class AppPlantinha extends StatelessWidget {
  const AppPlantinha({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      routerConfig: GoRouter(initialLocation: '/', 
      routes: <RouteBase>[
        GoRoute(
            path: '/',
            builder: (BuildContext context, GoRouterState state) {
              return const HomePage(
                title: 'Home Page',
              );
            }),
        GoRoute(
            path: '/settingsPage',
            builder: (BuildContext context, GoRouterState state) {
              return const SettingsPage(
                title: 'Settings Page',
              );
            }),
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
            path: '/logoutPage',
            builder: (BuildContext context, GoRouterState state) {
              return const LogoutPage(title: 'Logout Page');
            }),
        ]
      ),
      title: 'Material App',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(
          seedColor: Color(0xFF8EB486),
          brightness: Brightness.light,
          contrastLevel: 0,
        ),
        textTheme: const TextTheme(
          bodyMedium: TextStyle(fontSize: 15, color: Colors.black),
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
                fontSize: 20,
                fontWeight: FontWeight.bold,
                color: Colors.white
            ),
        ),
        listTileTheme: ListTileThemeData(
          textColor: Colors.white,
          iconColor: Colors.white,
        ),
      ),
    );
  }
}