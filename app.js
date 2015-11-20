var express = require('express'),
    app     = express(),
    PouchDB = require('pouchdb'),
    cors = require('cors'),
    morgan = require('morgan');

var corsOptions = {
  origin: 'http://manav:5000',
  credentials: true
};


var app = express();
app.use(morgan('tiny'));
app.use(cors(corsOptions));

app.use('/couchdb', require('express-pouchdb')(PouchDB, {
  mode: 'fullCouchDB'
}));

var port = 5984;
app.listen(port, function () {  
  console.log('PouchDB Test running on ' + port + " port.");  
});