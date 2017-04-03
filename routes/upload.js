var exphbs  = require('express-handlebars');
module.exports = function(){

  this.setup = function(req, res, next){
        res.render('upload')
  }
  this.setupStandalone = function(req, res, next){
    var hbs = exphbs.create({
        defaultLayout: 'index',
    });
    hbs.render(__dirname+'/../views/upload.standalone.handlebars',{layout:false}).then(function(t){res.send(t)})
  }
  this.storeFile = function(req, res, next){
        req.services(function(err,services){
            ////console.log(req.files.audio)
            var data = req.body;
            //console.log('REPLACE : '+data.song)
            var mp3 = (req.files.audio.name).split(' ').join('_')
            var mp3 = (req.files.audio.name).split("'").join('')
            //console.log('Result : '+mp3)
            var mp3File = req.files.audio;
            var mp3Path = ("/sound/"+mp3).toString();
            var mp3FileToPath = __dirname+'/../public/sound/'+mp3
            var image = req.files.art.name.split(' ').join('_')
            var imagePath = '/img/'+image
            var imageFileToPath = __dirname+'/../public/img/'+image
            var imageFile= req.files.art;
            data['image_art']= imagePath

            var audio = req.files.audio
            var imageart=req.files.art
            //console.log(data)
            var userTableData = {name:data.artist}
            var songTableData = {name:data.song,src:mp3Path,user_id:''}
            var imageArtData = {song_id:'',src:imagePath}
            var bioTableData = {user_id:'',link:data.link,cellphone:data.cellphone,location:data.location}

            var users = services.userDataServ;
            var songs = services.songDataServ;
            var images = services.imageDataServ;
            var feature = services.featureDataServ;
            var bio = services.bioDataServ;
            audio.mv(mp3FileToPath, function(err) {
                   if (err){
                     //console.log(err)
                     return res.status(500).send(err);
                  }
                  else{
                      imageart.mv(imageFileToPath, function(err) {
                          if (err){
                            //console.log(err)
                            return res.status(500).send(err);
                          }
                          else{
                            users.add(userTableData,function(err,results){
                              if(err){
                                //console.log(err)
                              }
                              else{
                                //console.log('\n Added user')
                                users.get(userTableData,function(err,results){
                                  if(err){
                                    //console.log(err)
                                  }
                                  else{
                                    //console.log('\n got user search')
                                    //console.log(results)
                                    //console.log('\n')
                                    songTableData.user_id = results[0].id
                                    bioTableData.user_id = results[0].id
                                    songs.add(songTableData,function(err,results){
                                        if(err){
                                          //console.log(err)
                                        }
                                        else{
                                          //console.log('\n Added song')
                                          songs.get({name:songTableData.name},function(err,results){
                                            if(err){
                                              //console.log(err)
                                            }
                                            else{
                                              //console.log(songTableData.name)
                                              //console.log(results)
                                              //console.log('\n got song search')
                                              imageArtData.song_id = results[0].id
                                              images.add(imageArtData,function(err,results){
                                                  if(err){
                                                    //console.log(err)
                                                  }
                                                  else{
                                                    //console.log('\n adding bio data')
                                                    bio.add(bioTableData,function(err,results){
                                                        if(err){
                                                          //console.log(err)
                                                        }
                                                        else{
                                                          feature.add({song_id:imageArtData.song_id},function(err,results){
                                                            //console.log('addding soooong to fetetetet')
                                                            if(err){
                                                              //console.log(err)
                                                            }
                                                            else{
                                                              var url ='/s/'+imageArtData.song_id
                                                              //console.log('redirecting to '+url)
                                                              res.redirect(url);
                                                            }
                                                          })

                                                        }
                                                    })
                                                  }
                                              })
                                            }

                                          })
                                        }
                                    })
                                  }
                                })
                              }
                            })

                          }
                      })
                   }
            })







       })
  }
}
