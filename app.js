var express = require('express'),
    app     = express(),
    PouchDB = require('pouchdb'),
    cors = require('cors'),
    bodyParser = require('body-parser');

var requestLogger = function (req, res, next){
  var log =  req.method + " "
  			+ req.url + "\n"
  			+ "Params = " +  JSON.stringify(req.params) + "\n"
  			+ "Body = " +  JSON.stringify(req.body)		
  console.log(log);
  next();
}

var corsOptions = {
  origin: 'http://manav:5000',
  credentials: true
};


var app = express();
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(requestLogger);
app.use(cors(corsOptions));

app.use('/couchdb', require('express-pouchdb')(PouchDB, {
  mode: 'fullCouchDB'
}));

var port = 5984;
app.listen(port, function () {  
  console.log('PouchDB Test running on ' + port + " port.");  
});