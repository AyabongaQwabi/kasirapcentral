var exphbs  = require('express-handlebars');
module.exports = function(){

  this.setup = function(req, res, next){
    req.services(function(err,services){
      var songs = services.songDataServ;
      songs.fetchGenres(function(err,results){
        //res.render('upload',{genres:results,layout:'index'})
        res.render('upload',{genres:results,layout:'index'} ,function(err, html) {
              // The output is minified, huzzah!
              //console.log(html);
              res.send(html);
        })
      })
    })

  }
  this.setupStandalone = function(req, res, next){
    var hbs = exphbs.create({
        defaultLayout: 'index',
    });
    hbs.render(__dirname+'/../views/upload.standalone.handlebars',{layout:false}).then(function(t){res.send(t)})
  }
  this.storeFile = function(req, res, next){
	console.log(req.body)
        req.services(function(err,services){
            ////console.log(req.files.audio)
            var data = req.body;
            console.log(data)
           console.log('REPLACE : '+data.song)
	   var mp3name= req.files.audio.name;
	   console.log('split->'+mp3name.split(' '))
           mp3name = mp3name.split(' ');
	   console.log("join->"+mp3name.join("_"))
	   mp3name=mp3name.join("_")
           var randomDigit ;
	var val = Math.floor(1000 + Math.random() * 9000).toString()
           var mp3 =req.files.audio.name.split(' ')[0].split("'").join("");
           var mp3 = "song_"+mp3.trim()+val+".mp3"
	   mp3name=mp3
            console.log('mp3 name Result : '+mp3name)
            var mp3File = req.files.audio;
             var mp3Path = ("/sound/"+mp3name).toString();
	    console.log("full mp3Path:"+mp3Path)
            var mp3FileToPath = __dirname+'/../public/sound/'+mp3name
            var image = req.files.art.name.split(' ').join('_')
            var imagePath = '/img/'+image
            var imageFileToPath = __dirname+'/../public/img/'+image
            var imageFile= req.files.art;
            data['image_art']= imagePath

            var audio = req.files.audio
            var imageart=req.files.art
            console.log(data)
            var userTableData = {name:data.artist,location:data.location}
            var songTableData = {name:data.song,src:mp3Path,user_id:'',genre_id:data.genre_id}
           console.log(songTableData)
		 var imageArtData = {song_id:'',src:imagePath}
            var bioTableData = {user_id:'',link:data.link,cellphone:data.cellphone}

            var users = services.userDataServ;
            var songs = services.songDataServ;
            var images = services.imageDataServ;
            var feature = services.featureDataServ;
            var bio = services.bioDataServ;
            audio.mv(mp3FileToPath, function(err) {
                   if (err){
                    console.log(err)
                     return res.status(500).send(err);
                  }
                  else{
                      imageart.mv(imageFileToPath, function(err) {
                          if (err){
                            console.log(err)
                            return res.status(500).send(err);
                          }
                          else{
                            users.add(userTableData,function(err,results){
                              if(err){
                                console.log(err)
                              }
                              else{
                                console.log('\n Added user')
				userTableData ={name:userTableData.name}
                                users.get(userTableData,function(err,results){
                                  if(err){
					console.log("Serarching by user data is the problem here")
                                    console.log(err)
                                  }
                                  else{
                               console.log('\n got user search')
                                    //console.log(results)
                                    //console.log('\n')
                                    songTableData.user_id = results[0].id
                                    bioTableData.user_id = results[0].id
                                    songs.add(songTableData,function(err,results){
                                        if(err){
                                          console.log(err)
                                        }
                                        else{
                                          //console.log('\n Added song')
                                          songs.get({name:songTableData.name},function(err,results){
                                            if(err){
                                              console.log(err)
                                            }
                                            else{
                                              //console.log(songTableData.name)
                                              console.log(results)
                                              console.log('\n got song search')
                                              imageArtData.song_id = results[0].id
                                              images.add(imageArtData,function(err,results){
                                                  if(err){
                                                    console.log(err)
                                                  }
                                                  else{
                                                    console.log('\n adding bio data')
                                                    bio.add(bioTableData,function(err,results){
                                                        if(err){
                                                          console.log(err)
                                                        }
                                                        else{
                                                          feature.add({song_id:imageArtData.song_id},function(err,results){
                                                           console.log('addding soooong to fetetetet')
                                                            if(err){
                                                          console.log(err)
                                                            }
                                                            else{
                                                              var url ='/s/'+imageArtData.song_id
                                                              console.log('redirecting to '+url)
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
