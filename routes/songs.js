var exphbs  = require('express-handlebars');
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
        function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

	req.services(function(err,services){
              var songService = services.songDataServ;
              songService.getSongs(function(err, results) {
                  //console.log(results)
                  //res.render('songlist',{songs:shuffle(results)})
                  res.render('songlist',{songs:shuffle(results)},function(err, html) {
                        // The output is minified, huzzah!
                        ////;
                        res.send(html);
                  })
              })
        });
  }
  this.app = function(req, res, next){

        req.services(function(err,services){
              var songService = services.songDataServ;
              songService.getSongs(function(err, results) {
                results.forEach(function(result){
                  result.src = 'https://krissmusic.tk'+result.src
                  result.image = 'https://krissmusic.tk'+result.image
                })
                var hbs = exphbs.create({
                    defaultLayout: 'index',
                });
                hbs.render(__dirname+'/../views/app.handlebars',{songs:results,layout:false}).then(function(t){res.send(t)})
              })
        });

  }
  this.latest = function(req, res, next){

        req.services(function(err,services){
              var songService = services.songDataServ;
              songService.getLatestSongs(function(err, results) {
                results.forEach(function(result){
                  result.src = 'https://krissmusic.tk'+result.src
                  result.image = 'https://krissmusic.tk'+result.image
                })
                var hbs = exphbs.create({
                    defaultLayout: 'index',
                });
                hbs.render(__dirname+'/../views/app.handlebars',{songs:results,layout:false}).then(function(t){res.send(t)})
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
    else if(req.body.name){
      console.log('Searching for: '+req.body.name)
      req.services(function(err,services){
            var songService = services.songDataServ;
            var data = {name:req.body.name}
            console.log(data)
            songService.findSong(data,function(err, results) {
              if(err){console.log(err)}
              console.log('found!')
              console.log(results)
              var url = '/s/'+results[0].id
              res.redirect(url)
            })
      });
    }
    else{
      res.redirect('/s/unknown')
    }
  }
  this.getSong = function(req,res,next){
    req.services(function(err,services){
          console.log(err)
          var song = req.params.songid
          var data = {id:song}
          var songService = services.songDataServ;
          songService.getSong(data,function(err, results) {
            if(err){console.log(err)}
            if(!results.length==0){
              res.render('song',{song:results[0],layout:false})
            }
            else{
              req.services(function(err,services){
                    var songService = services.songDataServ;
                    songService.getSongs(function(err, results) {
                        //res.render('find',{found:false,songs:results})
                        res.render('find',{found:false,songs:results} ,function(err, html) {
                              // The output is minified, huzzah!
                              ////;
                              res.send(html);
                        })
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
            //res.render('versus_setup',{songs:results})
            res.render('versus_setup',{songs:results} ,function(err, html) {
                  // The output is minified, huzzah!
                  //;
                  res.send(html);
            })
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
    console.log('User updating play'+req.body.song_id)
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
