import 'package:flutter/material.dart';

class ContainerWithButton extends StatefulWidget {
  const ContainerWithButton(
      {super.key,
      this.height,
      this.width,
      this.icon,
      this.labelText,
      this.marginBottom,
      this.marginLeft,
      this.marginRight,
      this.marginTop,
      this.heroTag,
      this.decoration,
      this.fontSize,
      required this.onPressed,
      this.fontWeight,
      this.rectangleRoundedBorder,
      this.paddingLeft,
      this.paddingRight,
      this.paddingTop,
      this.paddingBottom});
  final double? width,
      height,
      paddingTop,
      paddingBottom,
      paddingLeft,
      paddingRight,
      marginTop,
      marginBottom,
      marginLeft,
      marginRight,
      fontSize;
  final Widget? icon;
  final String? labelText, heroTag;
  final Decoration? decoration;
  final VoidCallback? onPressed;
  final FontWeight? fontWeight;
  final bool? rectangleRoundedBorder;

  @override
  State<ContainerWithButton> createState() => _ContainerWithButtonState();
}

class _ContainerWithButtonState extends State<ContainerWithButton> {
  Decoration? useRectangleRoundedBorder() {
    if (widget.rectangleRoundedBorder == true) {
      return BoxDecoration(
          color: Color(0xFF685752), borderRadius: BorderRadius.circular(20));
    }

    return null;
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      width: widget.width ?? 159,
      height: widget.height ?? 66,
      decoration: widget.decoration ?? useRectangleRoundedBorder(),
      padding: EdgeInsets.only(
          bottom: widget.paddingBottom ?? 0,
          left: widget.paddingLeft ?? 0,
          top: widget.paddingTop ?? 0,
          right: widget.paddingRight ?? 0),
      margin: EdgeInsets.only(
          top: widget.marginTop ?? 0,
          bottom: widget.marginBottom ?? 0,
          left: widget.marginLeft ?? 0,
          right: widget.marginRight ?? 0),
      child: ElevatedButton.icon(
        onPressed: widget.onPressed,
        label: Text(
          widget.labelText ?? '',
          style: TextStyle(
            fontSize: widget.fontSize,
            fontWeight: widget.fontWeight,
          ),
        ),
        style: ButtonStyle(
          iconColor: WidgetStateProperty.all(Colors.white),
          overlayColor: WidgetStateProperty.all(Colors.transparent),
          elevation: WidgetStateProperty.all(0),
          backgroundColor: WidgetStateProperty.all(Color(0xFF685752)),
          foregroundColor: WidgetStateProperty.all(Colors.white),
          textStyle: WidgetStateProperty.all(TextStyle(
            fontSize: 15,
          )),
          minimumSize: WidgetStateProperty.all(
              Size(widget.width ?? 159, widget.height ?? 66)),
          shape: WidgetStateProperty.all(
              RoundedRectangleBorder(borderRadius: BorderRadius.circular(100))),
          padding: WidgetStateProperty.all(
            const EdgeInsets.symmetric(horizontal: 0), // Reduz padding horizontal
          ),
        ),
        icon: widget.icon,
      ),
    );
  }
}
