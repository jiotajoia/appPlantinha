import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:lottie/lottie.dart';

class SplashScreenPage extends StatefulWidget {
  const SplashScreenPage({super.key, required this.title});
  final String title;

  @override
  State<SplashScreenPage> createState() => _SplashScreenPageState();
}

class _SplashScreenPageState extends State<SplashScreenPage> {
  @override
  void initState() {
    super.initState();

    // Aguarda 3 segundos e navega para a próxima tela
    Future.delayed(Duration(seconds: 4, microseconds: 15), () {
      // ignore: use_build_context_synchronously
      context.go('/');
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color(0xFF8EB486),
      body: Center(
        child: Lottie.asset('lib/lottie/App.json'),
      ),
    );
  }
}