import 'package:app_plantinha/provider/font_size.provider.dart';
import 'package:app_plantinha/widgets/container_with_button.widget.dart';
import 'package:app_plantinha/widgets/row_button_back.widget.dart';
import 'package:app_plantinha/widgets/scaffold_base.widget.dart';
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
    return ScaffoldBase(
      body: Padding(
        padding: EdgeInsets.only(top: 3,),
        child: Center(
          child: Column(
            children: [
              RowButtonBack(lastRoute: '/homePage'),
              Container(
                margin: EdgeInsets.only(top: 130),
                height: 400,
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    ContainerWithButton(
                      onPressed: (){},
                      rectangleRoundedBorder: true,
                      widthAdjusted: 295,
                      heightAdjusted: 126,
                      width: 220,
                      height: 126,
                      labelText: 'Tirar Foto',
                      icon: Icon(Icons.camera_alt_outlined, size: Provider.of<FontSizeState>(context).fontSize,),
                      fontSize: Provider.of<FontSizeState>(context).fontSize,
                      fontWeight: FontWeight.bold,
                    ),
                    ContainerWithButton(
                      onPressed: (){},
                      rectangleRoundedBorder: true,
                      width: 220,
                      height: 126,
                      widthAdjusted: 295, 
                      heightAdjusted: 126,
                      labelText: 'Escolher Imagem',
                      icon: SvgPicture.asset(
                        'lib/icons/GalleryImport.svg',
                        width: Provider.of<FontSizeState>(context).fontSize,
                        height: Provider.of<FontSizeState>(context).fontSize,
                      ),
                      fontSize: Provider.of<FontSizeState>(context).fontSize,
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