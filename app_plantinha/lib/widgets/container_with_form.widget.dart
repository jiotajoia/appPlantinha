import 'package:flutter/material.dart';

class ContainerWithForm extends StatefulWidget {
  const ContainerWithForm({super.key, required this.valor, required this.keyForm, this.textHintForm, this.height, this.marginTop, this.width, this.marginBottom, this.marginLeft, this.marginRight, this.paddingFormBottom, this.paddingFormLeft, this.paddingFormRight, this.paddingFormTop});
  final TextEditingController valor;
  final GlobalKey<FormState> keyForm;
  final String? textHintForm;
  final double? width, height, marginTop, marginBottom, marginLeft, marginRight,
  paddingFormTop, paddingFormBottom, paddingFormLeft, paddingFormRight;

  @override
  State<ContainerWithForm> createState() => _ContainerWithFormState();
}

class _ContainerWithFormState extends State<ContainerWithForm> {
  @override
  Widget build(BuildContext context) {
    return Container(
                width: widget.width ?? 165,
                height: widget.height ?? 33,
                margin: EdgeInsets.only(top: widget.marginTop ?? 0, bottom: widget.marginBottom ?? 0, left: widget.marginLeft ?? 0, right: widget.marginRight ?? 0),
                decoration: BoxDecoration(
                    color: Color(0xFF997C70),
                    borderRadius: BorderRadius.circular(100)
                ),
                child: Form(
                  key: widget.keyForm,
                  child: TextFormField(
                    controller: widget.valor,
                    style: TextStyle(color: Colors.white, fontSize: 16),
                    decoration: InputDecoration(
                        hintText: widget.textHintForm ?? 'Digite algo...',
                        hintStyle: TextStyle(color: Colors.white, fontSize: 12),
                        border: InputBorder.none,
                        contentPadding: EdgeInsets.only(bottom: widget.paddingFormBottom?? 0, left: widget.paddingFormLeft ?? 0, top: widget.paddingFormTop ?? 0, right: widget.paddingFormRight ??0)),
                  ),
                ),
              );
  }
}