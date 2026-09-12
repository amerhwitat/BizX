import 'package:flutter/material.dart';

void main() => runApp(const BizXApp());

class BizXApp extends StatelessWidget {
  const BizXApp({super.key});
  @override
  Widget build(BuildContext context) => MaterialApp(
    title: 'BizX',
    home: Scaffold(
      appBar: AppBar(title: const Text('BizX Game Hub')),
      body: ListView(children: [
        _menu(context, '2D Storyboard Adventure', '2D'),
        _menu(context, '3D World Builder', '3D'),
        _menu(context, '4D Timeline Quest', '4D'),
        _menu(context, 'Wallet Setup & Backup', 'Wallet'),
        _menu(context, 'Snapshots & Saves', 'Saves'),
        _menu(context, 'Hall of Fame', 'Scores'),
        _menu(context, 'Friends / Peer Presence', 'Network'),
      ]),
    ),
  );
  static Widget _menu(BuildContext context, String title, String tag) => ListTile(
    leading: CircleAvatar(child: Text(tag.substring(0, 1))),
    title: Text(title),
    trailing: const Icon(Icons.chevron_right),
    onTap: () => ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('$title selected'))),
  );
}
