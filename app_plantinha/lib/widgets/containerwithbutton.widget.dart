import 'package:flutter/material.dart';

class ContainerWithButton extends StatefulWidget {
  const ContainerWithButton({super.key, this.height, this.width, required this.icon, required this.labelText, this.margin, required this.heroTag});
  final double? width, height, margin;
  final Icon icon;
  final String labelText;
  final String heroTag;

  @override
  State<ContainerWithButton> createState() => _ContainerWithButtonState();
}

class _ContainerWithButtonState extends State<ContainerWithButton> {
  @override
  Widget build(BuildContext context) {
    return Container(
      width: widget.width ?? 159,
      height: widget.height ?? 66,
      margin: EdgeInsets.symmetric(vertical: widget.margin ?? 20),
      child: FloatingActionButton.extended(
        heroTag: widget.heroTag,
        icon: widget.icon,
        elevation: 0,
        hoverElevation: 0,
        label: Text(widget.labelText),
        onPressed: () {},
      ),
    );
  }
}