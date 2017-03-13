module.exports = function(connection){



  var executeQuery = function(query, data, cb){
      connection.query(query, data, cb);
  };

  this.getFeatured = function(cb){
      executeQuery('select featured.song_id , song.name as name ,user.id as user_id,user.name as artist ,image_art.src as art from featured,song,user, image_art where featured.song_id =song.id and song.user_id = user.id and image_art.song_id = song.id',cb);
  }
  this.getVideos= function(cb){
      executeQuery('select * from song',cb);
  }
}
