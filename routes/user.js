module.exports = function(){

  this.login = function(req, res, next){

        req.services(function(err,services){

              var userService = services.userDataServ;
              userService.getUsers(function(err, results) {


              })

        })
  }



    this.showLogin = function(req,res,next){
      res.render('pleaselogin')
    }

}
