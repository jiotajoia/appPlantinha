import 'package:app_plantinha/controllers/provider/font_size.provider.dart';
import 'package:app_plantinha/view/widgets/container_with_button.widget.dart';
import 'package:app_plantinha/view/widgets/row_button_back.widget.dart';
import 'package:app_plantinha/view/widgets/scaffold_base.widget.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';
import 'package:provider/provider.dart';

class SearchByImagePage extends StatefulWidget {
  const SearchByImagePage({super.key, required this.title});
  final String title;
  @override
  State<SearchByImagePage> createState() => _SearchByImagePageState();
}

class _SearchByImagePageState extends State<SearchByImagePage> {


  @override
  Widget build(BuildContext context) {
    double heightScreen = MediaQuery.of(context).size.height;
    double widthScreen = MediaQuery.of(context).size.width;

    return ScaffoldBase(
      body: Padding(
        padding: EdgeInsets.only(top: heightScreen * 0.004,),
        child: Center(
          child: Column(
            children: [
              RowButtonBack(lastRoute: '/homePage'),
              Container(
                margin: EdgeInsets.only(top: heightScreen * 0.176),
                height: heightScreen * 0.543,
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    ContainerWithButton(
                      onPressed: (){},
                      rectangleRoundedBorder: true,
                      widthAdjusted: widthScreen * 0.716,
                      heightAdjusted: heightScreen * 0.171,
                      width: widthScreen * 0.533,
                      height: heightScreen * 0.171,
                      labelText: 'Tirar Foto',
                      icon: Icon(Icons.camera_alt_outlined, size: Provider.of<FontSizeState>(context).fontSize + 1,),
                      fontSize: Provider.of<FontSizeState>(context).fontSize + 1,
                      fontWeight: FontWeight.bold,
                    ),
                    ContainerWithButton(
                      onPressed: (){},
                      rectangleRoundedBorder: true,
                      width: widthScreen * 0.533,
                      height: heightScreen * 0.171,
                      widthAdjusted: widthScreen * 0.716, 
                      heightAdjusted: heightScreen * 0.171,
                      labelText: 'Escolher Imagem',
                      icon: SvgPicture.asset(
                        'lib/icons/GalleryImport.svg',
                        width: Provider.of<FontSizeState>(context).fontSize + 1,
                        height: Provider.of<FontSizeState>(context).fontSize + 1,
                      ),
                      fontSize: Provider.of<FontSizeState>(context).fontSize + 1,
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