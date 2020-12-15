const getLeaderBoard = async () => {
  try {
    const apiResponse = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/ReKLjtunM0FSz3UUKpK9/scores');
    const scores = await apiResponse.json();
    return scores;
  } catch {
    throw new Error('Failed to fetch data from API');
  }
};

export default getLeaderBoard;
