import myFunction from '../module-for-test';

test('Random test', () => {
  expect(1).toBe(1);
})

test('module test', () => {
  expect(myFunction()).toBe(true);
})