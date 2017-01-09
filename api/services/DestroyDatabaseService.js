module.exports = {
  destroyAll: function(areYouSure) {
    if (areYouSure) {
      Duel.destroy({}, function() {});
      User.destroy({}, function() {});
      console.log('destroyed everything!');
    }
  }
}