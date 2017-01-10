function checkStatus(duel, user, endDate) {

  if (endDate > (new Date())) {
    return Promise.resolve('In Progress');
  }

  return ScoresService.getCurrentScores([duel.user1, duel.user2]).then(scores => {
    return new Promise((resolve, reject) => {
      Duel.update({id: duel.id}, {
        user1_finalScore: scores.user1_initialScore,
        user2_finalScore: scores.user2_initialScore
      }, function didUpdate(err) {

        if (duel.user1_finalScore > duel.user2_finalScore) {
          if (user.id === duel.user1.id) {
            resolve({status: 'Won!', finalScores: scores});
          }
        } else if (user.id === duel.user2.id) {
          resolve({status: 'Won!', finalScores: scores});
        }
        resolve({status: 'Lost', finalScores: scores});
      });
    });
  });
}

function getEndDate(duel) {
  const endDate = duel.startDate.getDate();
  const endMonth = duel.startDate.getMonth() + 1;
  const endYear = duel.startDate.getFullYear();

  return new Date(endYear, endMonth, endDate);
}

function createNewDuel(oldDuel, initialScores) {
  Duel.create({
    user1: oldDuel.user1.id,
    user2: oldDuel.user2.id,
    user1_initialScore: initialScores.user1_initialScore,
    user2_initialScore: initialScores.user2_initialScore
  }).exec((err, duel) => {
    if (err) {
      console.log(err);
      return;
    }
  });
}


module.exports = {
  checkStatus,
  getEndDate,
  createNewDuel
};
