const nodemailer = require('nodemailer');
const mailgun = require('nodemailer-mailgun-transport');


function sendEmail(opponent, recepient, emailAddr, duelId) {
  
  if (emailAddr === null) {
    return;
  }

  const transporter = nodemailer.createTransport(mailgun({
    auth: {
      api_key: process.env.mail_key,
      domain: 'hyperdrive.pw'
    }
  }));

  const mailOptions = {
    from: '"Duel-Lingo" heather@hyperdrive.pw',
    to: emailAddr,
    subject: 'Your Duel is ending soon!',
    html: 'Hi ' + recepient + '!<br><br>Your duel with ' + opponent + ' is ending soon - make sure you won\'t owe them $5 by earning more points than them on Duolingo! <br><br><a href="https://duel-lingo.herokuapp.com/duel/show/' + duelId + '">Click here to view duel</a><br>',
  };

  transporter.sendMail(mailOptions, function(err, info){
    if (err) {
      return console.log(err);
    }

  });
}


module.exports = {
  sendEmail
};
