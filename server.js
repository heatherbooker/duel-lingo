var express = require('express');
var server = express();
var usefulStuff = require('./index.js');

server.use(express.static('public'));
server.set('view engine', 'pug');

server.get('/', function(request, response) {
  response.render('index');
});


server.get('/duel', function(request, response) {

  const theGoods = usefulStuff.submitUsernames(request.query.user1, request.query.user2);

  Promise.all(theGoods).then(data => {
    const templateVars = {
      topUsersName: data[0].user,
      topUsersScore: data[0].value,
      secondUsersName: data[1].user,
      secondUsersScore: data[1].value,
      dates: (new Date()).toDateString()
    };
    response.render('index', templateVars);
  });

});


const listener = server.listen(process.env.PORT || 3000, function() {
  console.log('listening on port ' + listener.address().port);
});

