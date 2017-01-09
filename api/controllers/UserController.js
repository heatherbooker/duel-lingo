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
        return;
      }

      Duel.find({ 
        or:  [
          { user1_id: user.id },
          { user2_id: user.id }

      ]}, function duelsFound(err, duels) {

        if (err) {
          console.log(err);
        }

        const opponent = {};
        opponent.id = duel.user1_id === user.id ? duel.user2_id : duel.user1_id;

        User.findOne({ id: opponent.id }, function userFound(err, opponentUser) {
          if (err) {
            console.log(err);
            return;
          }
          opponent.username = opponentUser.username;

          let duelObjects = duels.map(duel => {
            return {
              versus: opponent.username,
              // If either user has a final score, the duel is over.
              status: duel.user2_finalScore ? 'Complete' : 'In Progress'
            };
          });

        });

        res.view({
          duels: duelObjects
        });
      });
    });
  }
	
};

