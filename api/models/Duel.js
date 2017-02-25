/**
 * Duel.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  schema: true,

  attributes: {

    startDate: {
      type: 'date',
      defaultsTo: function() {
        return new Date();
      }
    },

    endDate: {
      type: 'date',
      defaultsTo: function() {
        const startDate = new Date();
        const endDate = startDate.getDate();
        const endMonth = startDate.getMonth() + 1;
        const endYear = startDate.getFullYear();

        return new Date(endYear, endMonth, endDate);
        }
    },

    user1_initialScore: {
      type: 'integer'
    },
    user2_initialScore: {
      type: 'integer'
    },

    user1_finalScore: {
      type: 'integer',
      defaultsTo: null
    },
    user2_finalScore: {
      type: 'integer',
      defaultsTo: null
    },

    user1: {
      model: 'user'
    },
    user2: {
      model: 'user'
    }

  }
};

