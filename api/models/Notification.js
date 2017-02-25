/**
 * Notification.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  schema: true,

  attributes: {

    sendDate: {
      type: 'date',

      defaultsTo: function() {
        const startDate = new Date();
        const startDay = startDate.getDate();
        const startMonth = startDate.getMonth();
        startDate.setDate(startDay - 4);
        startDate.setMonth(startMonth + 1);
        return startDate;
      }
    },

    duel: {
      model: 'duel'
    },

    user1: {
      model: 'user'
    },
    user2: {
      model: 'user'
    }

  }
};

