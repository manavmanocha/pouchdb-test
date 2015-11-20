var express = require('express'),
    app     = express(),
    PouchDB = require('pouchdb'),
    cors = require('cors'),
    bodyParser = require('body-parser');


var fs = require('fs');
var util = require('util');

var log_file = fs.createWriteStream(__dirname + '/debug.log', {flags : 'w'});
var log_stdout = process.stdout;
console.log = function(d) { //
  log_file.write(util.format(d) + '\n');
  log_stdout.write(util.format(d) + '\n');
};    

var requestLogger = function (req, res, next){
  var log =  req.method + " "
  			+ req.url + "\n"
  			+ "Params = " +  JSON.stringify(req.params) + "\n"
  			+ "Body = " +  JSON.stringify(req.body)		
  console.log(log);
  next();
}

var corsOptions = {
  origin: true,
  credentials: true
};


var app = express();
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(requestLogger);
app.use(cors(corsOptions));

var InMemPouchDB = PouchDB.defaults({db: require('memdown')});
app.use('/couchdb', require('express-pouchdb')(InMemPouchDB, {
  mode: 'fullCouchDB'
}));

var port = 5984;
app.listen(port, function () {  
  console.log('PouchDB Test running on ' + port + " port.");  
});