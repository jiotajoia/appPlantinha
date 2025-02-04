import 'dart:convert';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:http/http.dart' as http;

class AuthService {
  final FirebaseAuth _auth = FirebaseAuth.instance;

  final String backExterno = "http://192.168.18.173:3000";

  Future<void> cadastrarUsers(String nome, String email, String password, String confirmPassword) async {
    try {
      await http.post(
        Uri.parse('$backExterno/user'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({
          'nome': nome,
          'email': email,
          'senha': password,
          'confirmacaoSenha': confirmPassword
        }),
      );
    } on FirebaseException catch (e) {
      // ignore: avoid_print
      print("Erro ao cadastrar: ${e.message}");
      throw Exception("Erro ao criar conta. Tente novamente.");
    } catch (e) {
      // ignore: avoid_print
      print("Erro inesperado: $e");
      throw Exception("Erro inesperado ao criar conta.");
    }
  }

  Future<void> logarUsers(String email, String password) async {
    try {
      UserCredential userCredential = await _auth.signInWithEmailAndPassword(
        email: email,
        password: password,
      );

      final String? idToken = await userCredential.user!.getIdToken();
      await http.post(
        Uri.parse('$backExterno/user/obter'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({
          'idToken': idToken,
        }),
      );
    } on FirebaseAuthException catch (e) {
      // ignore: avoid_print
      print("Erro ao fazer login: ${e.message}");
      rethrow;
    } catch (e) {
      // ignore: avoid_print
      rethrow;
    }
  }

  alterarNome(String newName) async {
    try {
      User? user = _auth.currentUser;
      String idUser = user!.uid;
      if (newName.isNotEmpty) {
        await http.patch(Uri.parse('$backExterno/user/$idUser/alterarNome'),
            headers: {'Content-Type': 'application/json'},
            body: {'novoNome': newName});
      } else {
        throw Exception("Nome não pode ser vazio.");
      }
    } catch (e) {
      rethrow;
    }
  }

  Future<void> enviarCodigo(String email) async {
    final response = await http.post(
      Uri.parse('$backExterno/send-code'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({'email': email}),
    );

    String error = jsonDecode(response.body).error;

    if (response.statusCode != 200) {
      throw Exception('Erro ao enviar código: $error');
    }
  }

  Future<void> verificarCodigo(String email, String code) async {
    final response = await http.post(
      Uri.parse('$backExterno/verify-code'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({'email': email, 'code': code}),
    );

    if (response.statusCode != 200) {
      throw Exception(jsonDecode(response.body).error);
    }
  }

  Future<void> resetarSenha(String newPassword, String confirmPassword) async {
    try {
      User? user = _auth.currentUser;
      String idUser = user!.uid;
      // ignore: unused_local_variable
      final response = await http.post(
        Uri.parse('$backExterno/user/$idUser/alterarSenha'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode(
            {'newPassword': newPassword, 'confirmPassword': confirmPassword}),
      );

      if (response.statusCode != 200) {
        throw Exception(jsonDecode(response.body).error);
      }
    } on Exception catch (e) {
      // ignore: avoid_print
      print("Erro ao resetar senha: ${e.toString()}");
      throw Exception("Erro ao resetar senha");
    }
  }

  Future<void> redefinirSenha(
      String email, String newPassword, String confirmPassword) async {
    try {
      final response = await http.post(
        Uri.parse('$backExterno/reset-password'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({
          'email': email,
          'newPassword': newPassword,
          'confirmPassword': confirmPassword
        }),
      );

      if (response.statusCode != 200) {
        throw Exception(jsonDecode(response.body).error);
      }
    } on Exception catch (e) {
      // ignore: avoid_print
      print("Erro ao resetar senha: ${e.toString()}");
      throw Exception("Erro ao resetar senha");
    }
  }

  Future<void> deletarConta() async {
    User? user = _auth.currentUser;
    String idUser = user!.uid;

    final response = await http.delete(Uri.parse('$backExterno/user/$idUser'),
        headers: {'Content-Type': 'application/json'});

    if (response.statusCode != 200) {
      throw Exception(jsonDecode(response.body).error);
    }
  }
}
