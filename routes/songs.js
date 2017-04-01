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
  this.getLatestID = function(req, res, next){
        req.services(function(err,services){
              var songService = services.songDataServ;
              songService.getSongs(function(err, results) {
                  //console.log(results)
                  res.send({id:results[results.length-1].id})
              })
        });
  }
  this.find = function(req,res,next){
    if(req.body.id){
      var url = '/s/'+req.body.id
      res.redirect(url)
    }
    else{
      res.redirect('/s/unknown')
    }
  }
  this.getSong = function(req,res,next){
    console.log('\n\n\ngetting song')
    req.services(function(err,services){
          console.log(err)
          var song = req.params.songid
          var data = {id:song}
          var songService = services.songDataServ;
          console.log('loading song service')
          songService.getSong(data,function(err, results) {
            console.log('Got song')
            if(err){console.log(err)}
            //console.log(results)
            if(!results.length==0){
              console.log('song exists...rendering')
              res.render('song',{song:results[0],layout:false})
            }
            else{
              console.log('song not exists')
              req.services(function(err,services){
                    var songService = services.songDataServ;
                    songService.getSongs(function(err, results) {
                        res.render('find',{found:false,layout:false,songs:results})
                    })
              });

            }

          })
    })

  }
  /*this.getArtistSongs = function(req,res,next){
    req.services(function(err,services){
          console.log(err)
          var artist = req.params.artistname
          var data = {name:artist}
          var songService = services.songDataServ;
          songService.getArtist(data,function(err, results) {
            res.render('versus_setup',{songs:results})
          })
    })

  }*/
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
        res.render('versus',{songs:results,layout:false})
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
