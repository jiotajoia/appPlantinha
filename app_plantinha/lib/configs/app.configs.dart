import 'package:shared_preferences/shared_preferences.dart';

class AppConfigs {
  static const _keyLastRoute = 'last_route';

  static Future<void> saveLastRoute(String route) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(_keyLastRoute, route);
  }

  // Recupera a última rota visitada
  static Future<String?> getLastRoute() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString(_keyLastRoute);
  }

  // Limpa as preferências
  static Future<void> clearPreferences() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.clear();
  }
}
