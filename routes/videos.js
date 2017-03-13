module.exports = function(){

  this.getFeatured = function(req, res, next){
        req.services(function(err,services){
              var videoService = services.videoDataServ;
              videoService.getFeatured(function(err, results) {
                  console.log(results)
                  res.render('home',{videos:results})
              })
        });
  }
  this.getAll = function(req, res, next){
        req.services(function(err,services){
              var videoService = services.videoDataServ;
              videoService.getVideos(function(err, results) {
                  console.log(results)
                  res.render('videolist',{videos:results})
              })
        });
  }

}
