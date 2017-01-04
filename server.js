var express = require('express');
var server = express();
var usefulStuff = require('./index.js');

server.set('view engine', 'pug');

server.get('/', function(request, response) {
  response.render('index', {output: 'WORDS'});
});


server.get('/duel', function(request, response) {

  const theGoods = usefulStuff.submitUsernames(request.query.user1, request.query.user2);

  Promise.all(theGoods).then(goodStuff => {
    response.render('index', {output: JSON.stringify(goodStuff)});
  });

});


const listener = server.listen(process.env.PORT || 3000, function() {
  console.log('listening on port ' + listener.address().port);
});

