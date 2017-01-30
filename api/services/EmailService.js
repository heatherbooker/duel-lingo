const nodemailer = require('nodemailer');
const mailgun = require('nodemailer-mailgun-transport');
const cron = require('node-schedule');


function sendEmail(recepient, opponent, duelId) {

  const transporter = nodemailer.createTransport(mailgun({
    auth: {
      api_key: sails.config.mail_api_key,
      domain: 'hyperdrive.pw'
    }
  }));

  const mailOptions = {
    from: '"Duel-Lingo" heather@hyperdrive.pw',
    to: recepient,
    subject: 'Your Duel is ending soon!',
    html: 'Hi there!<br><br>Your duel with ' + opponent + ' is ending soon - make sure you won\'t owe them $5 by earning more points than them on Duolingo! <br><br><a href="https://duel-lingo.herokuapp.com/duel/show/' + duelId + '">View duel</a>',
  };

  transporter.sendMail(mailOptions, function(err, info){
    if (err) {
      return console.log(err);
    }
    console.log('Message sent: ' + JSON.stringify(info));
  });
}


function scheduleEmails(user1, user2, duelId, endDate) {
  const min = endDate.getMinutes() + 1;
  const hour = endDate.getHours();
  const day = endDate.getDay();
  const month = endDate.getMonth();
  const year = endDate.getFullYear();

  const date = new Date(year, month, day, hour, min);
  const job = cron.scheduleJob(date, function() {

    // sendEmail(user1.email, user2.username, duelId);
    // sendEmail(user2.email, user1.username, duelId);
    if (user1.email !== null) {
      console.log('for USER 1: this is the thing! the thing is happening!');
    }
    if (user2.email !== null) {
      console.log('for USER 2: this is the thing! the thing is happening!');
    }
    
  });  
}


module.exports = {
    scheduleEmails
};
