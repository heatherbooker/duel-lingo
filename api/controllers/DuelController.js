/**
 * DuelController
 *
 * @description :: Server-side logic for managing duels
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  new: function(req, res) {
    res.view();
  },

  create: function(req, res, next) {

    const user1 = new Promise((resolve, reject) => {
      User.findOrCreate({ username: req.params.all().user1 }, (err, user) => {
        if (err) {
          console.log(err);
        }
        resolve(user);
      });
    });
    const user2 = new Promise((resolve, reject) => {
      User.findOrCreate({ username: req.params.all().user2 }, (err, user) => {
        if (err) {
          console.log(err);
        }
        resolve(user);
      });
    });

    const scores = ScoresService.getCurrentScores(req.params.all());
      
    Promise.all([user1, user2, scores]).then(data => {

      const duelData = data[2];

      duelData.user1 = data[0].id;
      duelData.user2 = data[1].id;

      Duel.create(duelData, (err, duel) => {
        if (err) {
          console.log(err);
          return res.redirect('/duel/new');
        }

        res.redirect(`/duel/show/${duel.id}`);
      });
    });
  },

  show: function(req, res, next) {

    Duel.findOne(req.param('id'))
      .populate(['user1', 'user2'])
      .exec(function foundDuel(err, duel) {
      
        if (err) {
          return next(err);
        }
 
        const usernames = {
          user1: duel.user1.username,
          user2: duel.user2.username
        };

        ScoresService.getCurrentScores(usernames).then(scores => {

          let dataForView = {
            date: duel.startDate
          };

          const user1_increase = scores.user1_initialScore - duel.user1_initialScore;
          const user2_increase = scores.user2_initialScore - duel.user2_initialScore;

          if (duel.user1_increase > user2_increase) {
            dataForView.topUserScore = user1_increase;
            dataForView.secondUserScore = user2_increase;
            dataForView.topUserName = duel.user1.username;
            dataForView.secondUserName = duel.user2.username;
          } else {
            dataForView.topUserScore = user2_increase;
            dataForView.secondUserScore = user1_increase;
            dataForView.topUserName = duel.user2.username;
            dataForView.secondUserName = duel.user1.username;
          }

          res.view(dataForView);
        });
      });
  }
	
};

