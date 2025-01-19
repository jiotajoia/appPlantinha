import 'package:app_plantinha/provider/font_size.provider.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class ContainerWithForm extends StatefulWidget {
  const ContainerWithForm(
      {super.key,
      required this.controllerForm,
      required this.keyForm,
      this.textHintForm,
      required this.height,
      this.marginTop,
      required this.width,
      this.marginBottom,
      this.marginLeft,
      this.marginRight,
      this.paddingBottom,
      this.paddingLeft,
      this.paddingRight,
      this.paddingTop,
      required this.heightAdjusted,
      required this.widthAdjusted,
      this.fontSizeForm,
      this.fontSizeHint});
  final TextEditingController controllerForm;
  final GlobalKey<FormState> keyForm;
  final String? textHintForm;
  final double? fontSizeForm,
      fontSizeHint,
      width,
      widthAdjusted,
      height,
      heightAdjusted,
      marginTop,
      marginBottom,
      marginLeft,
      marginRight,
      paddingTop,
      paddingBottom,
      paddingLeft,
      paddingRight;

  @override
  State<ContainerWithForm> createState() => _ContainerWithFormState();
}

class _ContainerWithFormState extends State<ContainerWithForm> {
    final double widthBase = 0, heightBase = 0;

  dynamic getPropertyAdjusted(BuildContext context, dynamic property, dynamic valueBase, dynamic valueAdjusted) {
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
      width: getPropertyAdjusted(
          context, widthBase, widget.width!, widget.widthAdjusted!),
      height: getPropertyAdjusted(
          context, heightBase, widget.height!, widget.heightAdjusted!),
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
      decoration: BoxDecoration(
          color: Color(0xFF997C70), borderRadius: BorderRadius.circular(100)),
      child: Center(
        child: Form(
          key: widget.keyForm,
          child: TextFormField(
            controller: widget.controllerForm,
            style: TextStyle(color: Colors.white, fontSize: widget.fontSizeForm ?? 31),
            decoration: InputDecoration(
                hintText: widget.textHintForm ?? 'Digite algo...',
                hintStyle: TextStyle(color: Colors.white, fontSize: widget.fontSizeHint ?? 27),
                border: InputBorder.none,
                isDense: true,
                contentPadding: EdgeInsets.zero),
          ),
        ),
      ),
    );
  }
}
