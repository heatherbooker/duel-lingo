function checkStatus(duel, user, endDate) {

  if (endDate > (new Date())) {
    return Promise.resolve({status: 'In Progress'});
  }

  if (duel.user1_finalScore !== null) {
    return Promise.resolve(ScoresService.checkWinner(duel, user));
  }

  const usernames = {
    user1: duel.user1.username,
    user2: duel.user2.username
  };

  return ScoresService.getCurrentScores(usernames).then(scores => {
    return new Promise((resolve, reject) => {

      Duel.update({id: duel.id}, {
        user1_finalScore: scores.user1_initialScore,
        user2_finalScore: scores.user2_initialScore

      }, function didUpdate(err, updatedDuel) {
        // The only way to populate an updated duel is create a new query for it.
        Duel.findOne({id: duel.id})
          .populate(['user1', 'user2'])
          .exec((err, populatedDuel) => {

            return resolve(ScoresService.checkWinner(populatedDuel, user, true));
          });
      });
    });
  });
}


function createNewDuel(oldDuel) {

  Duel.create({
    user1: oldDuel.user1.id,
    user2: oldDuel.user2.id,
    user1_initialScore: oldDuel.user1_finalScore,
    user2_initialScore: oldDuel.user2_finalScore

  }).exec((err, duel) => {
    if (err) {
      console.log(err);
      return;
    }
  });
}


module.exports = {
  checkStatus,
  createNewDuel
};
