var express= require("express")
var path = require('path')
var app = express();

app.use(express.static('public'))

app.get('/',function(req,res){
    res.sendfile('public/home.html')
})

app.listen(5000)
