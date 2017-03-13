module.exports = function(){

  this.getFeatured = function(req, res, next){
        req.services(function(err,services){
              var featureService = services.featureDataServ;
              featureService.getSongs(function(err, results) {
                  console.log(results)
                  res.render('home',{songs:results})
              })
        });
  }
  this.getAllSongs = function(req, res, next){
        req.services(function(err,services){
              var songService = services.songDataServ;
              songService.getSongs(function(err, results) {
                  console.log(results)
                  res.render('songlist',{songs:results})
              })
        });
  }

}
