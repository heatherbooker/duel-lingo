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

  email: function(req, res, next) {

    const params = req.params.all();

    req.session.userInfo = {};

    const userPromises = [params.user1, params.user2].map((username, i) => {

      return DuolingoService.getUserInfo(username)
        .then(userInfo => {
          req.session.userInfo[`user${i}`] = userInfo;

          return userInfo;
        })
        .catch(err => {
          res.redirect('/duel/new');
        });
    });

    Promise.all(userPromises).then(userInfo => {

      res.json(userInfo[0]);

      res.view({
        user1: params.user1,
        user2: params.user2,
        user1email: userInfo[0].email,
        user2email: userInfo[1].email
      });
    });
  },

  create: function(req, res, next) {

    const params = req.params.all();

    const user1Info = {
      username: params.user1,
      email: params.user1email
    };
    const user2Info = {
      username: params.user2,
      email: params.user2email
    };

    const users = [user1Info, user2Info].map(userInfo => {
      return new Promise((resolve, reject) => {
        User.findOrCreate(userInfo, (err, user) => {
          if (err) {
            console.log(err);
          }
          resolve(user);
        });
      });
    });

    const scores = ScoresService.getCurrentScores(req.session.userInfo);
      
    Promise.all([users]).then(users => {

      const duelData = scores;

      duelData.user1 = users[0].id;
      duelData.user2 = users[1].id;

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

