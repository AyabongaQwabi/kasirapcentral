module.exports = function(connection){



  var executeQuery = function(query, data, cb){
      connection.query(query, data, cb);
  };

  this.fetch = function(cb){
      executeQuery('select * from `group`',cb);
  }
  this.add= function(data,cb){
      executeQuery('insert into `group` set ?',data,cb);
  }
}
