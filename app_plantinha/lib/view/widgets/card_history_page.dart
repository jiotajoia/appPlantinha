import 'package:app_plantinha/controllers/provider/font_size.provider.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class CardHistoryPage extends StatelessWidget {
  const CardHistoryPage({super.key, required this.text});
  final String text;
  

  @override
  Widget build(BuildContext context) {
    double heightScreen = MediaQuery.of(context).size.height;
    double widthScreen = MediaQuery.of(context).size.width;
    double fontSizeProvider = Provider.of<FontSizeState>(context).fontSize;


    return Card(
      color: Color(0xFF8EB486),
      child: SizedBox(
        width: widthScreen * 0.98,
        height: fontSizeProvider >= 24 ? heightScreen * 0.5 : heightScreen * 0.25,
        child: Padding(
          padding: EdgeInsets.all(8),
          child: Row(
            children: [
              Text(text),
              Spacer(),
              IconButton(
                onPressed: (){}, 
                icon: Icon(Icons.visibility)
              ),
              IconButton(
                onPressed: (){}, 
                icon: Icon(Icons.delete)
              )
            ],
          )
        ),


      ),
    );
  }
}