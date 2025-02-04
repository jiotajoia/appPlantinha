import 'dart:async';
import 'dart:io';
import 'package:camera/camera.dart';
import 'package:http/http.dart' as http;
import 'package:flutter/material.dart';

class TakePicturePage extends StatefulWidget {
  const TakePicturePage({
    super.key,
    required this.camera,
  });

  final CameraDescription camera;

  @override
  TakePicturePageState createState() => TakePicturePageState();
}

class TakePicturePageState extends State<TakePicturePage> {
  late CameraController _controller;
  late Future<void> _initializeControllerFuture;

  @override
  void initState() {
    super.initState();

    _controller = CameraController(
      widget.camera,
      ResolutionPreset.veryHigh,
    );

    _initializeControllerFuture = _controller.initialize();
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  Future<void> sendImageToServer(String imagePath) async {
    try {
      final uri = Uri.parse('url eba'); //mudar url !!!
      final request = http.MultipartRequest('POST', uri);

      final file = File(imagePath);
      final fileStream = http.ByteStream(file.openRead());
      final length = await file.length();

      request.files.add(http.MultipartFile('file', fileStream, length,
          filename: 'image.jpg'));

      final response = await request.send();

      if (response.statusCode == 200) {
        // ignore: avoid_print
        print('Imagem enviada com sucesso');
      } else {
        // ignore: avoid_print
        print('Falha ao enviar imagem: ${response.statusCode}');
      }
    } catch (e) {
      // ignore: avoid_print
      print('Erro ao enviar imagem: $e');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Tire foto da planta')),
      body: FutureBuilder<void>(
        future: _initializeControllerFuture,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.done) {
            // Obtém a proporção correta da câmera
            final aspectRatio = _controller.value.aspectRatio;

            return SizedBox.expand(
              child: AspectRatio(
                aspectRatio: aspectRatio,
                child: RotatedBox(
                  quarterTurns: _controller.description.sensorOrientation ~/ 90,
                  child: CameraPreview(_controller),
                ),
              ),
            );
          } else {
            return const SizedBox.expand(child: CircularProgressIndicator());
          }
        },
      ),
      floatingActionButton: SizedBox(
        width: 80.0,
        height: 80.0,
        child: FloatingActionButton(
          backgroundColor: Colors.green,
          onPressed: () async {
            try {
              await _initializeControllerFuture;

              final image = await _controller.takePicture();

              if (!context.mounted) return;

              await sendImageToServer(image.path);

              // ignore: use_build_context_synchronously
              await Navigator.of(context).push(
                MaterialPageRoute(
                  builder: (context) => DisplayPictureScreen(
                    imagePath: image.path,
                  ),
                ),
              );
            } catch (e) {
              // ignore: avoid_print
              print(e);
            }
          },
          child: const Icon(Icons.camera_alt, size: 50.0),
        ),
      ),
      floatingActionButtonLocation: FloatingActionButtonLocation.centerFloat,
    );
  }
}

class DisplayPictureScreen extends StatelessWidget {
  final String imagePath;

  const DisplayPictureScreen({super.key, required this.imagePath});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Foto')),
      body: Image.file(File(imagePath)),
    );
  }
}
