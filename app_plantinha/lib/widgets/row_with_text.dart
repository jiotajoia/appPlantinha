import 'package:flutter/material.dart';

class RowWithText extends StatefulWidget {
  const RowWithText({super.key, required this.textLabel, this.fontSize, this.fontWeight, this.marginBottom,this.marginLeft, this.marginRight, this.marginTop});
  final String textLabel;
  final double? fontSize, marginTop, marginBottom, marginLeft, marginRight;
  final FontWeight? fontWeight;

  @override
  State<RowWithText> createState() => _RowWithTextState();
}

class _RowWithTextState extends State<RowWithText> {
  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.only(top: widget.marginTop ?? 0, bottom: widget.marginBottom ?? 0, left: widget.marginLeft ?? 0, right: widget.marginRight ?? 0),
      child: Row(
        children: [
          Text(
            widget.textLabel,
            style: TextStyle(
              fontSize: widget.fontSize,
              fontWeight: widget.fontWeight
            ),
          ),
        ],
      ),
    );
  }
}
