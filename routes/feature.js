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
              var eventService = services.eventDataServ;
              songService.getFeatured(function(err, results) {
                 var songs = results;
                 songs.forEach(function(song){
                   song.url = song.url.toString();
                   //console.log(song.url);
                 })
                 //console.log(results[5].url.toString());
                videoService.getFeatured(function(err, results) {
                    results.forEach(function(result){
                      result.url=getId(result.url)
                    })
                    var videos = results;
                    eventService.getEvents(function(err, results) {
                      res.render('home',{songs:songs,videos:videos,events:results,layout:"index.video.handlebars"})
                    })

                })
            })
        });
  }

}
