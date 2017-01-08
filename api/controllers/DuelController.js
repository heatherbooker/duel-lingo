/**
 * DuelController
 *
 * @description :: Server-side logic for managing duels
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  'new': function(req, res) {

    // res.locals.flash is available to the views, unlike req.session.flash.
    res.locals.flash = _.clone(req.session.flash);
    res.view();

    req.session.flash = {};
  },

  create: function(req, res, next) {

    Duel.create( req.params.all(), function duelCreated(err, duel) {
      if (err) {
        console.log(err);
        // Can store vars in req.session and they will be avail until user closes tab.
        req.session.flash = {
          err: err
        };

        return res.redirect('/duel/new');

      }

      res.json(duel);
      req.session.flash = {};
    });
  }
	
};

