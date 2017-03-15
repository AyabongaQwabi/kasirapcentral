module.exports = function(connection){

  var executeQuery = function(query, data, cb){
      connection.query(query, data, cb);
  };

  this.getEvents= function(cb){
      executeQuery('select * from event',cb);
  }
}
