import 'dart:convert';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:http/http.dart' as http;

class AuthService {
  final FirebaseAuth _auth = FirebaseAuth.instance;
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;

  final String backExterno = "http://192.168.18.173:3000";

  void cadastrarComNome(String name, String email, String password) async {
    try {
      UserCredential userCredential = await _auth.createUserWithEmailAndPassword(email: email, password: password);

      User? user = userCredential.user;
      if (user != null) {
        await userCredential.user?.updateDisplayName(name);
        await userCredential.user?.reload();

        await _firestore.collection('users').doc(userCredential.user?.uid).set({
          'uid': userCredential.user?.uid,
          'name': name,
          'email': email,
          'createdAt': DateTime.now().toIso8601String(),
        });
      }
    } on FirebaseException catch (e) {
      // ignore: avoid_print
      print("Erro ao cadastrar: ${e.message}");
      throw Exception("Erro ao criar conta. Tente novamente.");
    }
  }

  alterarNome(String newName) async {
  try {
    User? user = _auth.currentUser;
    if (user != null) {
      if (newName.isNotEmpty) {
        await user.updateDisplayName(newName);
        await user.reload();
        await _firestore.collection('users').doc(user.uid).update({
          'name': newName,
        });
      } else {
        throw Exception("Nome não pode ser vazio.");
      }
    } else {
      throw Exception("Nenhum usuário autenticado.");
    }
  } catch (e) {
    rethrow;
  }
}


  Future<void> redefinirSenha(String email) async {
    final response = await http.post(
      Uri.parse('$backExterno/send-code'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({'email': email}),
    );

    if (response.statusCode != 200) {
      throw Exception('Erro ao enviar código');
    }
  }

  Future<bool> verificarCodigo(String email, String code) async {
    final response = await http.post(
      Uri.parse('$backExterno/verify-code'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({'email': email, 'code': code}),
    );

    if (response.statusCode == 200) {
      return true;
    } else {
      throw Exception("Código inválido");
    }
  }

  Future<void> resetarSenha(
      String email, String newPassword, String confirmPassword) async {
    try {
      // ignore: unused_local_variable
      final response = await http.post(
        Uri.parse('$backExterno/reset-password'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({
          'email': email,
          'newPassword': newPassword,
          'confirmPassword': confirmPassword
        }),
      );
    } on Exception catch (e) {
      // ignore: avoid_print
      print("Erro ao resetar senha: ${e.toString()}");
      throw Exception("Erro ao resetar senha");
    }
  }
}
