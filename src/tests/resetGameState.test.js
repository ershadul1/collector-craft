import resetGameState from '../helpers/resetGameState';
import gameState from '../game-state/gameState';

test('Resets game score', () => {
  gameState.score = 111;
  resetGameState();
  expect(gameState.score).toBe(0);
});

test('Resets player life', () => {
  gameState.life = 50;
  resetGameState();
  expect(gameState.life).toBe(100);
});

test('Resets collected coins', () => {
  gameState.coins = 5;
  resetGameState();
  expect(gameState.coins).toBe(0);
});