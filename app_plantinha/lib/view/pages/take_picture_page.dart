import 'dart:async';
import 'dart:io';
import 'package:camera/camera.dart';
import 'package:image_picker/image_picker.dart';
import 'package:flutter_image_compress/flutter_image_compress.dart';
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
    File? _image;

  final picker = ImagePicker();

  Future<void> _captureImage() async {
    final pickedFile = await picker.pickImage(source: ImageSource.camera);

    if (pickedFile != null) {
      setState(() {
        _image = File(pickedFile.path);
      });

      // Enviar a imagem para o OpenAI
      File? c_image = await compressImage(_image!);
     String result = await sendImageToOpenAI(c_image);
print("Nome da planta: $result");
    }
  }

  Future<File> compressImage(File imageFile) async {
    // Compactar a imagem
    final result = await FlutterImageCompress.compressWithFile(
      imageFile.absolute.path,
      minWidth: 800,
      minHeight: 800,
      quality: 80, // Ajuste a qualidade conforme necessário
      rotate: 0,
    );

    // Salvar a imagem compactada em um novo arquivo
     final newFile = File('${imageFile.path}_compressed.jpg')
    ..writeAsBytesSync(result!);

    return newFile;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Capturar Imagem da Planta')),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            _image == null
                ? Text('Nenhuma imagem capturada.')
                : Image.file(_image!),
            ElevatedButton(
              onPressed: _captureImage,
              child: Text('Capturar Imagem'),
            ),
          ],
        ),
      ),
    );
  }
}
