// Todo eventually: also check if duel needs to restart.

var EmailService = require('./api/services/EmailService.js');
const mongodb = require('mongodb');

const uri = `mongodb://duelmaster:${process.env.db_key}@ds111529.mlab.com:11529/duelingo`;

mongodb.MongoClient.connect(uri, function(err, db) {
 
  if (err) {
    return console.error(err);
  }

  const userTable = db.collection('user');
  const duelTable = db.collection('duel');
  const notifTable = db.collection('notification'); 


  notifTable.find({sendDate: {$lte: new Date()}}).each(function(err, notif) {
   
    if (notif !== null) {
    
      userTable.find({_id: { $in: [notif.user1, notif.user2] }}).toArray(function(err, users) {
        if (users.length === 2) {
          EmailService.sendEmail(users[0].username, users[1].username, users[1].email, notif.duel);
          EmailService.sendEmail(users[1].username, users[0].username, users[0].email, notif.duel);
        }
      });

      notifTable.remove({duel: notif.duel});

    } else {
      db.close();
    }
  });

});

