import 'package:flutter/material.dart';

class RowButtonBack extends StatelessWidget {
  const RowButtonBack({super.key});  

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisSize: MainAxisSize.max,
      children: [
        Container(
          padding: const EdgeInsets.only(left: 9),
          child: IconButton(
            onPressed: () {
              Navigator.pop(context);
            },
            icon: Icon(
              Icons.arrow_back,
              size: 24,
            ),
          ),
        ),
      ],
    );
  }
}
