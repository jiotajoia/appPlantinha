import 'package:app_plantinha/controllers/provider/font_size.provider.dart';
import 'package:app_plantinha/view/widgets/container_with_button.widget.dart';
import 'package:app_plantinha/view/widgets/row_button_back.widget.dart';
import 'package:app_plantinha/view/widgets/scaffold_base.widget.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';
import 'package:provider/provider.dart';
import 'package:image_picker/image_picker.dart';
import 'package:camera/camera.dart';
import 'dart:async';
import 'dart:io';
import 'package:app_plantinha/controllers/services/api_services.dart';
import 'package:flutter_image_compress/flutter_image_compress.dart';

class SearchByImagePage extends StatefulWidget {
  const SearchByImagePage({
    super.key,
    required this.title,
    required this.camera,
  });

  final String title;
  final CameraDescription camera;

  @override
  State<SearchByImagePage> createState() => _SearchByImagePageState();
}

class _SearchByImagePageState extends State<SearchByImagePage> {
  File? _image;
  final picker = ImagePicker();

  Future<void> _pickImage(ImageSource source) async {
    final pickedFile =
        await ImagePicker().pickImage(source: source, imageQuality: 50);
    if (pickedFile != null) {
      setState(() {
        _image = File(pickedFile.path);
      });
    }

    File? c_image = await compressImage(_image!);

    List<String> result = await identifyPlant(c_image);

    print("Nome da planta: $result");
  }

  Future<File> compressImage(File imageFile) async {
    // Compactar a imagem
    final result = await FlutterImageCompress.compressWithFile(
      imageFile.absolute.path,
      minWidth: 800,
      minHeight: 800,
      quality: 80,
      rotate: 0,
    );

    final newFile = File('${imageFile.path}_compressed.jpg')
      ..writeAsBytesSync(result!);

    return newFile;
  }

  Future<void> _captureImage() async {
    final pickedFile = await picker.pickImage(source: ImageSource.camera);

    if (pickedFile != null) {
      setState(() {
        _image = File(pickedFile.path);
      });

      File? c_image = await compressImage(_image!);
      List<String> result = await identifyPlant(c_image);
      
      print("Nome da planta: $result");
    }
  }

  @override
  Widget build(BuildContext context) {
    double heightScreen = MediaQuery.of(context).size.height;
    double widthScreen = MediaQuery.of(context).size.width;

    return ScaffoldBase(
      body: Padding(
        padding: EdgeInsets.only(
          top: heightScreen * 0.004,
        ),
        child: Center(
          child: Column(
            children: [
              RowButtonBack(),
              Container(
                margin: EdgeInsets.only(top: heightScreen * 0.176),
                height: heightScreen * 0.543,
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    ContainerWithButton(
                      onPressed: () {
                        _captureImage();
                      },
                      rectangleRoundedBorder: true,
                      widthAdjusted: widthScreen * 0.716,
                      heightAdjusted: heightScreen * 0.171,
                      width: widthScreen * 0.533,
                      height: heightScreen * 0.171,
                      labelText: 'Tirar Foto',
                      icon: Icon(
                        Icons.camera_alt_outlined,
                        size: Provider.of<FontSizeState>(context).fontSize + 1,
                      ),
                      fontSize:
                          Provider.of<FontSizeState>(context).fontSize + 1,
                      fontWeight: FontWeight.bold,
                    ),
                    ContainerWithButton(
                      onPressed: () {
                        _pickImage(ImageSource.gallery);
                      },
                      rectangleRoundedBorder: true,
                      width: widthScreen * 0.533,
                      height: heightScreen * 0.171,
                      widthAdjusted: widthScreen * 0.716,
                      heightAdjusted: heightScreen * 0.171,
                      labelText: 'Escolher Imagem',
                      icon: SvgPicture.asset(
                        'lib/icons/GalleryImport.svg',
                        width: Provider.of<FontSizeState>(context).fontSize + 1,
                        height:
                            Provider.of<FontSizeState>(context).fontSize + 1,
                      ),
                      fontSize:
                          Provider.of<FontSizeState>(context).fontSize + 1,
                      fontWeight: FontWeight.bold,
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
