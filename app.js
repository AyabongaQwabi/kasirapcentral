var express= require("express");
var mysql = require("mysql");
var myconnection = require("express-myconnection");
var fileUpload = require('express-fileupload');
var safe = require('./config/password-safe');
exphbs  = require('express-handlebars');
var path = require('path');
var bodyParser = require('body-parser');
var minify = require('express-minify');
var http = require('https');
var fs = require('fs');


var app = express();
//app.use(require('helmet')());
userMethods =require('./routes/user')
userDataService = require('./dataServices/userDataService'),
eventDataService = require('./dataServices/eventDataService'),
imageDataService = require('./dataServices/imageDataservice'),
bioDataService = require('./dataServices/bioDataservice'),
featureDataService = require('./dataServices/featureDataservice'),
featureMethods =require('./routes/feature'),
songMethods =require('./routes/songs'),
uploadMethods =require('./routes/upload'),
songDataService = require('./dataServices/songDataService'),
videoMethods =require('./routes/videos'),
videoDataService = require('./dataServices/videoDataService'),
ConnectionProvider = require('./routes/connectionProvider');


var dbOptions = {
 host: 'localhost',
  user: 'root',
  password:safe.fetchSecured(),
  port: 3306,
  database: 'kriss'
};
var serviceSetupCallback = function(connection){
	return {
    songDataServ : new songDataService(connection),
    videoDataServ : new videoDataService(connection),
    userDataServ : new userDataService(connection),
    eventDataServ : new eventDataService(connection),
    imageDataServ : new imageDataService(connection),
    bioDataServ : new bioDataService(connection),
    featureDataServ : new featureDataService(connection)
	}
};




var sslPath = '/etc/letsencrypt/live/krissmusic.tk/';

var options = {
    key: fs.readFileSync(sslPath + 'privkey.pem'),
    cert: fs.readFileSync(sslPath + 'fullchain.pem')
};



var myConnectionProvider = new ConnectionProvider(dbOptions, serviceSetupCallback);
app.use(myConnectionProvider.setupProvider);
app.use(myconnection(mysql, dbOptions, 'pool'));
app.use(express.static('public'))
app.use(minify({cache: __dirname + '/cache'}));
app.use(fileUpload());
app.use(minify());

app.engine('handlebars', exphbs({defaultLayout: 'index'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var feature = new featureMethods();
var songs = new songMethods();
var videos = new videoMethods();
var user = new userMethods();
var upload = new uploadMethods();

app.get('/',function(req,res){
  res.render('splash');
})
app.get('/main',feature.getFeatured)
app.get('/music',songs.getAll)
app.get('/videos',videos.getAll)
app.post('/update/flame',songs.updateFlameCount)
app.post('/update/download',songs.updateDownloadCount)
app.post('/update/play',songs.updatePlayCount)
app.get('/upload',upload.setup)
app.post('/upload',upload.storeFile)
app.get('/songlist',songs.getAll)
app.get('/versus/setup',songs.getSetupVersus)
app.post('/versus/setup',songs.setVersus)
app.get('/versus',songs.getVersus)
app.get('/s/:songid',songs.getSong)
app.get('/s/latest/id',songs.getLatestID)
app.post('/s/find',songs.find)
app.get('/generate',function(req,res){
  res.send({code:Math.floor(Math.random() * 90000) + 10000});
})
/*app.get('/a/:artistname',songs.getArtist)*/
app.listen(5000)
app.get('/api/standalone/app',songs.app)
app.post('/api/standalone/app',songs.app)
app.get('/api/standalone/app/latest',songs.latest)
app.post('/api/standalone/app/latest',songs.latest)
app.get('/api/standalone/app/upload',upload.setupStandalone)
app.post('/api/standalone/app/upload',upload.setupStandalone)

var server = http.createServer(options, app);
var io = require('socket.io').listen(server);
server.listen(443);
