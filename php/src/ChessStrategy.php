<?php
namespace BizX;
final class ChessStrategy {
    public int $turn = 0;
    public array $resources = ['gold'=>100,'food'=>100,'science'=>0];
    public function tick(string $resource, int $amount): int { $this->resources[$resource] = ($this->resources[$resource] ?? 0) + $amount; return ++$this->turn; }
    public function uci(string $fen, string $command='go movetime 100'): array { return ['protocol'=>'UCI','fen'=>$fen,'command'=>$command,'adapter'=>'external-engine']; }
}
