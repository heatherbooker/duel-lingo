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

    let user1, user2;

    User.findOrCreate({ username: req.params.all().user1 }, (err, user) => {
      if (err) {
        console.log(err);
      }
      user1 = user;
    });
    User.findOrCreate({ username: req.params.all().user2 }, (err, user) => {
      if (err) {
        console.log(err);
      }
      user2 = user;
    });

    ScoresService.getCurrentScores(req.params.all())
      .then(duelData => {

        while (!user1 || !user2) {}

        duelData.user1 = user1.id;
        duelData.user2 = user2.id;

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
        if (!duel) {
          return next();
        }

        let dataForView = {
          date: duel.startDate
        };

        if (duel.user1_initialScore > duel.user2_initialScore) {
          dataForView.topUserScore = duel.user1_initialScore;
          dataForView.secondUserScore = duel.user2_initialScore;
          dataForView.topUserName = duel.user1.username;
          dataForView.secondUserName = duel.user2.username;
        } else {
          dataForView.topUserScore = duel.user2_initialScore;
          dataForView.secondUserScore = duel.user1_initialScore;
          dataForView.topUserName = duel.user2.username;
          dataForView.secondUserName = duel.user1.username;
        }

        res.view(dataForView);
        
      });
  }
	
};

