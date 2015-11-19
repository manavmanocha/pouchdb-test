var express = require('express'),
    app     = express(),
    PouchDB = require('pouchdb'),
    cors = require('cors');

var corsOptions = {
  origin: 'http://manav:8080',
  credentials: true
};

app.use(cors(corsOptions));

var InMemPouchDB = PouchDB.defaults({db: require('memdown')});
app.use('/couchdb', require('express-pouchdb')(InMemPouchDB, {
  mode: 'fullCouchDB'
}));

var port = 5984;
app.listen(port, function () {  
  console.log('PouchDB Test running on ' + port + " port.");  
});