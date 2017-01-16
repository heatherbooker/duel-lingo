function checkWinner(duel, user, duelJustEnded) {

  const user1_increase = duel.user1_finalScore - duel.user1_initialScore;
  const user2_increase = duel.user2_finalScore - duel.user2_initialScore;
  
  const statusObject = {oldDuel: duel, duelJustEnded};

  if (user1_increase === user2_increase) {
    statusObject.status = 'Tied';
  } else if (user1_increase > user2_increase) {
    if (user.id === duel.user1.id) {
      statusObject.status = 'Won!';
    }
  } else if (user.id === duel.user2.id) {
    statusObject.status = 'Won!';
  } else {
    statusObject.status = 'Lost';
  }

  return statusObject;
}

function getCurrentScores(users) {
  var promises = [users.user1, users.user2].map((user, i) => {
    return getCurrentScore(user, i);
  });
  // For development (when duo is down):
  // var promises = [users.user1, users.user2].map(user => Promise.resolve(Math.floor(Math.random()*8000)));
  
  return Promise.all(promises).then(scores => {
    return {
      user1_initialScore: scores[0],
      user2_initialScore: scores[1]
    };
  });
}

function getCurrentScore(userToFind) {

  return DuolingoService.getUserData(userToFind))
    .then(data => {

      let language;
      for (let lang in data.language_data) {
        if (data.language_data.hasOwnProperty(lang)) {
          language = lang;
        }
      }

      const users = data.language_data[language].points_ranking_data;
      const user = users.find(user => {
        return user.username.toLowerCase() === userToFind.toLowerCase();
      });

      return user.points_data.total;

    });
}

module.exports = {
  getCurrentScores,
  checkWinner
};
