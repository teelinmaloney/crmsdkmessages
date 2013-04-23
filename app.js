
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , crm = require('./routes/crm')
  , http = require('http')
  , path = require('path');

var app = express();

express.logger.format('dev', function (tokens, req, res) {
    var status = res.statusCode
      , color = 32;

    if (status >= 500) color = 31
    else if (status >= 400) color = 33
    else if (status >= 300) color = 36;

    return '\033[33m[' + new Date().toISOString() + '] '
      + '\033[90m' + req.method
      + ' ' + req.originalUrl + ' '
      + '\033[' + color + 'm' + res.statusCode
      + ' \033[90m'
      + (new Date - req._startTime)
      + 'ms'
      + '\033[0m';
});

// all environments
app.set('port', process.env.PORT || 1337);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', crm.sdkmessages);
app.get('/:message', crm.sdkmessages);

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
