import 'package:flutter/material.dart';
import 'mobile_game_state.dart';

void main() => runApp(const BizXMobileApp());

class BizXMobileApp extends StatelessWidget {
  const BizXMobileApp({super.key});
  @override
  Widget build(BuildContext context) {
    final state = MobileGameEngine.start(mode: 'tycoon');
    return MaterialApp(home: Scaffold(body: Center(child: Text('BizX • ${state.mode} • BIZ • Cash ${state.cash}'))));
  }
}
