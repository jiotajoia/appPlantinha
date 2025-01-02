import 'package:app_plantinha/widgets/container_with_button.widget.dart';
import 'package:app_plantinha/widgets/row_button_back.widget.dart';
import 'package:app_plantinha/widgets/scaffold_base.widget.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';

class SearchByImagePage extends StatelessWidget {
  const SearchByImagePage({super.key, required this.title});
  final String title;

  @override
  Widget build(BuildContext context) {
    return ScaffoldBase(
      body: Padding(
        padding: EdgeInsets.only(top: 3,),
        child: Center(
          child: Column(
            children: [
              RowButtonBack(lastRoute: '/homePage'),
              Container(
                margin: EdgeInsets.only(top: 130),
                height: 328,
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    ContainerWithButton(
                      onPressed: (){},
                      rectangleRoundedBorder: true,
                      width: 215,
                      height: 126,
                      labelText: 'Tirar Foto',
                      icon: Icon(Icons.camera_alt_outlined),
                      fontSize: 16,
                      fontWeight: FontWeight.bold,
                    ),
                    ContainerWithButton(
                      onPressed: (){},
                      rectangleRoundedBorder: true,
                      width: 215,
                      height: 126,
                      labelText: 'Escolher Imagem',
                      icon: SvgPicture.asset(
                        'lib/icons/GalleryImport.svg',
                      ),
                      fontSize: 16,
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