import sleep from '../helpers/sleep';

test('Sleep test', () => {
  expect(sleep(0)).resolves.toBe();
});