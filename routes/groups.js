module.exports = function(){

  this.add = function(req, res, next){
        req.services(function(err,services){
              var data = req.body
              console.log(data)
              var groupService = services.groupDataServ;
              groupService.add(data,function(err, results) {
                  if(err){
                    console.log(err)
                  }
                  groupService.fetch(function(err,results){
                    var filteredResults=[]
                    results.forEach(function(result){
                       var r = result.link.split('.')
                       var groupLink=false
                       console.log(r)
                       r.forEach(function(rlet){
                         rlet.toLowerCase()
                       })
                       if(r[0].split('/').indexOf('chat') ==1){
                         console.log('has chat')
                         groupLink = true
                       }
                       if(r.indexOf('whatsapp') == 1){
                         console.log('has whatsapp')
                         groupLink = true
                       }

                       if(groupLink){
                         filteredResults.push(result)
                       }

                    })
                    //res.render('groups',{groups:filteredResults})
                    res.render('groups',{groups:filteredResults} ,function(err, html) {
                          // The output is minified, huzzah!
                          //console.log(html);
                          res.send(html);
                    })
                  })
              })
        })
  }
  this.getGroups = function(req,res,next){
    req.services(function(err,services){
        var groupService = services.groupDataServ;
        groupService.fetch(function(err,results){
          var filteredResults=[]
          results.forEach(function(result){
             var r = result.link.split('.')
             var groupLink=false
             console.log(r)
             r.forEach(function(rlet){
               rlet.toLowerCase()
             })
             if(r[0].split('/').indexOf('chat') ==1){
               console.log('has chat')
               groupLink = true
             }
             if(r.indexOf('whatsapp') == 1){
               console.log('has whatsapp')
               groupLink = true
             }

             if(groupLink){
               filteredResults.push(result)
             }

          })
          //res.render('groups',{groups:filteredResults})
          res.render('groups',{groups:filteredResults} ,function(err, html) {
                // The output is minified, huzzah!
                //console.log(html);
                res.send(html);
          })
        })
    })
  }

}
