const nodemailer = require('nodemailer');
const mailgun = require('nodemailer-mailgun-transport');


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
    if(err){
      return console.log(err);
    }
    console.log('Message sent: ' + JSON.stringify(info));
  });
}

module.exports = {
    sendEmail  
};
