import gameState from '../game-state/gameState';

export default function resetGame() {
  gameState.score = 0;
  gameState.life = 100;
  gameState.coins = 0;
}