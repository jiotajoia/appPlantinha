import 'package:app_plantinha/provider/font_size.provider.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class ContainerWithButton extends StatefulWidget {
  const ContainerWithButton({
    super.key,
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
    this.paddingBottom,
    this.color,
    required this.widthAdjusted,
    required this.width,
    required this.height,
    required this.heightAdjusted,
    this.textColor,
    this.iconColor
  });

  final double?
      width,
      widthAdjusted,
      height,
      heightAdjusted,
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
  final Color? color, textColor, iconColor;

  @override
  State<ContainerWithButton> createState() => _ContainerWithButtonState();
}

class _ContainerWithButtonState extends State<ContainerWithButton> {
  final double widthBase = 0, heightBase = 0;

  Decoration? useRectangleRoundedBorder() {
    if (widget.rectangleRoundedBorder == true) {
      return BoxDecoration(
        color: const Color(0xFF685752),
        borderRadius: BorderRadius.circular(15),
      );
    }

    return null;
  }

  dynamic getPropertyAdjusted(
      BuildContext context, dynamic property, dynamic valueBase, dynamic valueAdjusted) {
    setState(() {
      if (Provider.of<FontSizeState>(context).fontSize >= 20) {
        property = valueAdjusted;
      } else {
        property = valueBase;
      }
    });
    return property;
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      width: getPropertyAdjusted(context, widthBase, widget.width!, widget.widthAdjusted!),
      height: getPropertyAdjusted(context, heightBase, widget.height!, widget.heightAdjusted!),
      decoration: widget.decoration ?? useRectangleRoundedBorder(),
      padding: EdgeInsets.only(
        bottom: widget.paddingBottom ?? 0,
        left: widget.paddingLeft ?? 0,
        top: widget.paddingTop ?? 0,
        right: widget.paddingRight ?? 0,
      ),
      margin: EdgeInsets.only(
        top: widget.marginTop ?? 0,
        bottom: widget.marginBottom ?? 0,
        left: widget.marginLeft ?? 0,
        right: widget.marginRight ?? 0,
      ),
      child: ElevatedButton.icon(
        onPressed: widget.onPressed,
        label: Flexible(
          child: Text(
            widget.labelText ?? '',
            style: TextStyle(
              fontSize: widget.fontSize,
              fontWeight: widget.fontWeight,
              color: widget.textColor
            ),
          ),
        ),
        style: ButtonStyle(
          iconColor: WidgetStateProperty.all(widget.iconColor ?? Colors.white),
          overlayColor: WidgetStateProperty.all(Colors.transparent),
          elevation: WidgetStateProperty.all(0),
          backgroundColor:
              WidgetStateProperty.all(widget.color ?? const Color(0xFF685752)),
          foregroundColor: WidgetStateProperty.all(Colors.white),
          textStyle: WidgetStateProperty.all(
            const TextStyle(fontSize: 15),
          ),
          minimumSize: WidgetStateProperty.all(
            Size(
              getPropertyAdjusted(context, widthBase, widget.width!, widget.widthAdjusted!),
              getPropertyAdjusted(context, heightBase, widget.height!, widget.heightAdjusted!),
            ),
          ),
          shape: WidgetStateProperty.all(
            RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(100),
            ),
          ),
          padding: WidgetStateProperty.all(
            const EdgeInsets.symmetric(horizontal: 0), // Reduz padding horizontal
          ),
        ),
        icon: widget.icon,
      ),
    );
  }
}
