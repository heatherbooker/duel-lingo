/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  duels: function(req, res, next) {

    User.findOne({ 'username': req.params.id }, function userFound(err, user) {
      if (err) {
        console.log(err);
        return res.redirect('/404');
      }

      Duel.find()
      .populate(['user1', 'user2'])
      .exec(function duelsFound(err, duels) {

        if (err) {
          console.log(err);
          return res.redirect('/404');
        }

        let duelObjects = [];

        duels
          .filter(duel => duel.user1.id === user.id || duel.user2.id === user.id)
          .forEach((duel, index, updatedDuels) => {

            const opponent = duel.user1.id === user.id ? duel.user2 : duel.user1;
            const endDate = duel.startDate.getDate();
            const endMonth = duel.startDate.getMonth() + 1;
            const endYear = duel.startDate.getYear();

            duelObjects.push({
              versus: opponent.username,
              // If either user has a final score, the duel is over.
              status: duel.user2_finalScore ? 'Complete' : 'In Progress',
              start: duel.startDate,
              end: new Date(endYear, endMonth, endDate)
            });

            if (index === updatedDuels.length - 1) {
              res.view({
                duels: duelObjects
              });
            }

          });

      });
    });
  }
	
};

