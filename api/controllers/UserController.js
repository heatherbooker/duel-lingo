/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  view: function(req, res, next) {
    const username = req.params.all().username;

    res.redirect(`/user/duels/${username}`);
  },

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

            DuelManagerService.checkStatus(duel, user, duel.endDate).then(status => {

              if (status.duelJustEnded) {
                DuelManagerService.createNewDuel(status.oldDuel);
              }

              duelObjects.push({
                id: duel.id,
                versus: opponent.username,
                status: status.status,
                start: duel.startDate,
                end: duel.endDate
              });

              if (index === updatedDuels.length - 1) {
                res.view({
                  duels: duelObjects
                });
              }

            });
          });
      });
    });
  }
	
};

