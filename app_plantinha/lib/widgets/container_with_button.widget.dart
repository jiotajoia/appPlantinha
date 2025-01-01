import 'package:flutter/material.dart';

class ContainerWithButton extends StatefulWidget {
  const ContainerWithButton({super.key, this.height, this.width,  this.icon,  this.labelText, this.marginBottom,this.marginLeft, this.marginRight, this.marginTop, this.heroTag, this.decoration, this.fontSize, required this.containerDecoration, this.fabRounded, this.onPressed});
  final double? width, height, marginTop, marginBottom, marginLeft, marginRight, fontSize;
  final Icon? icon;
  final String? labelText, heroTag;
  final Decoration? decoration;
  final bool? containerDecoration;
  final bool? fabRounded;
  final VoidCallback? onPressed;

  @override
  State<ContainerWithButton> createState() => _ContainerWithButtonState();
}

class _ContainerWithButtonState extends State<ContainerWithButton> {

  Color? useContainerDecoration(){
    if(widget.containerDecoration == true){
      return Colors.transparent;
    }
  
    return null;
  }

  ShapeBorder? useFABRounded(){
    if(widget.fabRounded == true){
      return RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(100),
      ); // Define o arredondamento das bordas)
    }

    return null;
  }



  @override
  Widget build(BuildContext context) {
    return Container(
      width: widget.width ?? 159,
      height: widget.height ?? 66,
      decoration: widget.decoration,
      margin: EdgeInsets.only(top: widget.marginTop ?? 0, bottom: widget.marginBottom ?? 0, left: widget.marginLeft ?? 0, right: widget.marginRight ?? 0),
      child: FloatingActionButton.extended(
        backgroundColor: useContainerDecoration(),
        shape: useFABRounded(),
        heroTag: widget.heroTag,
        icon: widget.icon,
        elevation: 0,
        hoverElevation: 0,
        label: Text(widget.labelText?? '',
        style: TextStyle(
          fontSize: widget.fontSize
        ),),
        onPressed: widget.onPressed,
      ),
    );
  }
}