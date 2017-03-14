module.exports = function(){

  this.getFeatured = function(req, res, next){
        req.services(function(err,services){
              var songService = services.songDataServ;
              songService.getFeatured(function(err, results) {
                  //console.log(results)
                  res.render('home',{songs:results})
              })
        });
  }
  this.getAll = function(req, res, next){
        req.services(function(err,services){
              var songService = services.songDataServ;
              songService.getSongs(function(err, results) {
                  //console.log(results)
                  res.render('songlist',{songs:results})
              })
        });
  }
  this.updateFlameCount = function(req, res, next){
        console.log('User updating flame')
        req.services(function(err,services){
              var songService = services.songDataServ;
              songService.getSongs(function(err, results) {
                  results.forEach(function(result){
                    if(result.id == req.body.song_id){
                      var flames = (result.flame_count+=1);
                      var updateData =[{flame_count:flames},{id:result.id}]
                      songService.updateSong(updateData)
                      res.send({flames:flames})
                    }
                  })

              })
        });
  }
  this.updatePlayCount =function(req, res, next){
    console.log('User updating flame')
        req.services(function(err,services){
              var songService = services.songDataServ;
              songService.getSongs(function(err, results) {
                  results.forEach(function(result){

                    if(result.id == req.body.song_id){
                      var plays = (result.play_count+=1);
                      var updateData =[{play_count:plays},{id:result.id}]
                      songService.updateSong(updateData)
                      res.send({plays:plays})
                    }
                  })

              })
        });
  }
  this.updateDownloadCount =function(req, res, next){
        req.services(function(err,services){
              var songService = services.songDataServ;
              songService.getSongs(function(err, results) {
                  results.forEach(function(result){
                    if(result.id == req.body.song_id){
                      var downloads = (result.download_count+=1);
                      var updateData =[{download_count:downloads},{id:result.id}]
                      songService.updateSong(updateData)
                      res.send({downloads:downloads})
                    }
                  })

              })
        });
  }
}
