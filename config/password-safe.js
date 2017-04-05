var fs=require('fs')
var path = require('path')
var request = require('./plugin/request')
module.exports.fetchSecured = function(){
        var __path = path.join(process.env.HOME,request.fetch().toString())
        return fs.readFileSync(__path).toString().trim();

  }
