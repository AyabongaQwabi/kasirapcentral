module.exports = function(connection){



  var executeQuery = function(query, data, cb){
      connection.query(query, data, cb);
  };

  this.getUsers = function(cb){
      executeQuery('select * from user',cb);
  }
  this.get = function(data,cb){
      //executeQuery('select * from user where '+connection.escape(column)+' like ?'+data,cb)
    executeQuery('select * from user where ?',data,cb)
  }
  this.add= function(data,cb){
      executeQuery('insert into user set ?',data,cb);
  }
}
