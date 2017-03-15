module.exports = function(connection){

  var executeQuery = function(query, data, cb){
      connection.query(query, data, cb);
  };

  this.add= function(data,cb){
      executeQuery('insert into bio set ?',data,cb);
  }
}
