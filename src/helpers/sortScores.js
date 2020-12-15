const sortScores = (scores) => {
  const result = scores.sort((a, b) => b.score - a.score);
  return result.slice(0, 10);
};

export default sortScores;