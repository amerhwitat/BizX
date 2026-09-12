import 'dart:math';

enum Suit { clubs, diamonds, hearts, spades }
enum Rank { ace, two, three, four, five, six, seven, eight, nine, ten, jack, queen, king }

class PlayingCard {
  final Suit suit;
  final Rank rank;
  const PlayingCard(this.suit, this.rank);
  bool get red => suit == Suit.diamonds || suit == Suit.hearts;
  String get symbol => const {Suit.clubs: '♣', Suit.diamonds: '♦', Suit.hearts: '♥', Suit.spades: '♠'}[suit]!;
  String get label => '${const ['A','2','3','4','5','6','7','8','9','10','J','Q','K'][rank.index]}$symbol';
}

class Deck {
  final List<PlayingCard> cards = [for (final suit in Suit.values) for (final rank in Rank.values) PlayingCard(suit, rank)];
  void shuffle([Random? random]) => cards.shuffle(random ?? Random());
  PlayingCard draw() => cards.removeLast();
}

class PokerHand {
  static List<PlayingCard> bestFive(List<PlayingCard> cards) {
    if (cards.length <= 5) return [...cards];
    final sorted = [...cards]..sort((a, b) => b.rank.index.compareTo(a.rank.index));
    return sorted.take(5).toList();
  }
}

class PokerRound {
  final Deck deck = Deck();
  final List<PlayingCard> community = [];
  final List<PlayingCard> player = [];
  final List<PlayingCard> bot = [];
  PokerRound() { deck.shuffle(); }
  void deal() {
    player.clear(); bot.clear(); community.clear();
    player.addAll([deck.draw(), deck.draw()]);
    bot.addAll([deck.draw(), deck.draw()]);
    community.addAll([deck.draw(), deck.draw(), deck.draw()]);
  }
  void turn() => community.add(deck.draw());
  void river() => community.add(deck.draw());
}

class BlackjackRound {
  final Deck deck = Deck();
  final List<PlayingCard> player = [];
  final List<PlayingCard> dealer = [];
  BlackjackRound() { deck.shuffle(); }
  void deal() {
    player.clear(); dealer.clear();
    player.addAll([deck.draw(), deck.draw()]);
    dealer.addAll([deck.draw(), deck.draw()]);
  }
  static int value(List<PlayingCard> cards) {
    var total = 0; var aces = 0;
    for (final c in cards) {
      if (c.rank == Rank.ace) { total += 11; aces++; }
      else if (c.rank.index >= Rank.jack.index) total += 10;
      else total += c.rank.index + 1;
    }
    while (total > 21 && aces-- > 0) total -= 10;
    return total;
  }
}

class ClassicCardGames {
  static const games = ['Texas Hold’em Poker', 'Blackjack', 'Klondike Solitaire', 'FreeCell', 'Hearts', 'Spades', 'Crazy Eights', 'War'];
}
