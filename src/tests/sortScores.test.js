import sortScores from '../helpers/sortScores';

test('Get an sorted array containing 10 elements', () => {
  const scores = []
  for(let i = 0; i < 20; i+=1) {
    scores.push({score: i});
  }
  
  const result = []
  for(let i = 19; i > 9; i-=1) {
    result.push({score: i});
  }
  console.log(sortScores(scores))
  expect(sortScores(scores)).toStrictEqual(result);
});
