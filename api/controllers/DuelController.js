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

    User.create({ username: req.params.all().user1 }, (err, user) => {
      if (err) {
        console.log(err);
      }
      user1 = user;
    });
    User.create({ username: req.params.all().user2 }, (err, user) => {
      if (err) {
        console.log(err);
      }
      user2 = user;
    });

    ScoresService.getCurrentScores(req.params.all())
      .then(duelData => {

        duelData.user1_id = user1.id;
        duelData.user2_id = user2.id;

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

    Duel.findOne(req.param('id'), function foundDuel(err, duel) {
      
      if (err) {
        return next(err);
      }
      if (!duel) {
        return next();
      }

      let user1IsTopUser = false;

      let dataForView = {
        date: duel.startDate
      };

      if (duel.user1_initialScore > duel.user2_initialScore) {
        user1IsTopUser = true;
        dataForView.topUserScore = duel.user1_initialScore;
        dataForView.secondUserScore = duel.user2_initialScore;
      } else {
        dataForView.topUserScore = duel.user2_initialScore;
        dataForView.secondUserScore = duel.user1_initialScore;
      }

      User.findOne({ id: duel.user1_id }, function foundUser(err, user) {
        if (err) {
          console.log(err);
          return;
        }
        if (user1IsTopUser) {
          dataForView.topUserName = user.username;
        } else {
          dataForView.secondUserName = user.username;
        }
      });
      User.findOne({ id: duel.user2_id }, function foundUser(err, user) {
        if (err) {
          console.log(err);
          return;
        }
        if (user1IsTopUser) {
          dataForView.secondUserName = user.username;
        } else {
          dataForView.topUserName = user.username;
        }
      });
console.log(dataForView);
      res.view(dataForView);
      
    });
  }
	
};

