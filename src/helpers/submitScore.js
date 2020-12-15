const submitScore = async (user, score) => {
  try {
    const data = { user, score };
    await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/ReKLjtunM0FSz3UUKpK9/scores', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  } catch (err) {
    throw new Error('Failed to submit data to API');
  }
};

export default submitScore;