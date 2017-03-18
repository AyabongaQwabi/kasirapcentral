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
  this.getSetupVersus = function(req,res,next){
    req.services(function(err,services){
      console.log(err)
          var songService = services.songDataServ;
          songService.getSongs(function(err, results) {
            res.render('versus_setup',{songs:results})
          })
    })

  }
  this.setVersus = function(req,res,next){
    var id1 = req.body.song1
    var id2 = req.body.song2
    var data=[id1,id2]
    req.services(function(err,services){
      var songService = services.songDataServ;
      songService.createCompetition(data,function(err,results){
        if(err){console.log(err)}
        else{
          res.redirect('/versus')
        }

      })
    })
  }
  this.getVersus = function(req,res,next){
    req.services(function(err,services){
      var songService = services.songDataServ;
      songService.getCompetition(function(err,results){
        res.render('versus',{songs:results})
      })
    })
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
