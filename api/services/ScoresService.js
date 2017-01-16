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
  
  return {
    user1_initialScore: getCurrentScore(users.user1),
    user2_initialScore: getCurrentScore(users.user2)
  };
}

function getCurrentScore(userInfo) {

  let language;
  for (let lang in userInfo.language_data) {
    if (userInfo.language_data.hasOwnProperty(lang)) {
      language = lang;
    }
  }

  const users = userInfo.language_data[language].points_ranking_data;
  const user = users.find(user => {
    return user.username.toLowerCase() === userToFind.toLowerCase();
  });

  return user.points_data.total;
}

module.exports = {
  getCurrentScores,
  checkWinner
};
