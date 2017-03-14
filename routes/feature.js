module.exports = function(){
  var getId = function(url) {
        var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        var match = url.match(regExp);

        if (match && match[2].length == 11) {
            return match[2];
        } else {
            return 'error';
        }
    }
  this.getFeatured = function(req, res, next){
        req.services(function(err,services){
              var songService = services.songDataServ;
              var videoService = services.videoDataServ;
              songService.getFeatured(function(err, results) {
                 var songs = results;
                videoService.getFeatured(function(err, results) {
                    results.forEach(function(result){
                      result.url=getId(result.url)
                    })
                    console.log(results)
                    console.log('rendering songs')
                    res.render('home',{songs:songs,videos:results})
                })
            })
        });
  }

}
