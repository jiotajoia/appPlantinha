import 'package:app_plantinha/configs/app.configs.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class RowButtonBack extends StatelessWidget {
  const RowButtonBack({super.key, required this.lastRoute});
  final String lastRoute;
  

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisSize: MainAxisSize.max,
      children: [
        Container(
          padding: const EdgeInsets.only(left: 9),
          child: IconButton(
            onPressed: () {
              AppConfigs.saveLastRoute(lastRoute);
              context.pop();
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
