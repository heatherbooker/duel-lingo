/**
 * Duel.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  schema: true,

  attributes: {

    user1_id: {
      type: 'integer'
    },
    user2_id: {
      type: 'integer'
    },

    startDate: {
      type: 'date',
      defaultsTo: new Date()
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
    }

  }
};

