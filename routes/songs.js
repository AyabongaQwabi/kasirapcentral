module.exports = function(){

  this.getFeatured = function(req, res, next){
        req.services(function(err,services){
              var songService = services.songDataServ;
              songService.getFeatured(function(err, results) {
                  console.log(results)
                  res.render('home',{songs:results})
              })
        });
  }
  this.getAll = function(req, res, next){
        req.services(function(err,services){
              var songService = services.songDataServ;
              songService.getSongs(function(err, results) {
                  console.log(results)
                  res.render('songlist',{songs:results})
              })
        });
  }

}
