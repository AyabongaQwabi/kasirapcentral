module.exports = function(){

  this.getFeatured = function(req, res, next){
        req.services(function(err,services){
              var songService = services.songDataServ;
              var videoService = services.videoDataServ;
              songService.getFeatured(function(err, results) {
                videoService.getFeatured(function(err, results) {
                    console.log(results)
                    res.render('home',{songs:results})
                })
            })
        });
  }

}
