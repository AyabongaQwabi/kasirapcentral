module.exports = function(connection){

  var executeQuery = function(query, data, cb){
      connection.query(query, data, cb);
  };
  this.getFeatured = function(cb){
      executeQuery('select featured.song_id , song.name as name,song.play_count,song.download_count,song.flame_count,song.src as url ,user.id as user_id,user.location,user.name as artist ,image_art.src as art from featured,song,user, image_art where featured.song_id =song.id and song.user_id = user.id and image_art.song_id = song.id',cb);
  }
  this.getSongs= function(cb){
      executeQuery('select song.id,song.src,song.name,song.play_count,song.download_count,song.flame_count,user.name as artist,image_art.src as image  from user,song,image_art where user.id=song.user_id and song.id = image_art.song_id',cb);
  }
  this.getLatestSongs= function(cb){
      executeQuery('select song.id,song.src,song.name,song.play_count,song.download_count,song.flame_count,user.name as artist,image_art.src as image  from user,song,image_art where user.id=song.user_id and song.id = image_art.song_id order by id desc',cb);
  }
  this.updateSong = function(data){

    executeQuery('update song SET ? where ?',data)
  }
  this.add= function(data,cb){
      executeQuery('insert into song set ?',data,cb);
  }
  this.getSong = function(data,cb){
    executeQuery("select song.id,song.src,song.name,song.play_count,song.download_count,song.flame_count,user.name as artist,image_art.src as image ,bio.link as social_link from user,song,image_art,bio where user.id=song.user_id and song.id = image_art.song_id and user.id = bio.user_id and song.id = ?",data.id,cb)
  }
  this.findSong = function(data,cb){
    executeQuery("select * from song where name like ?",data.name,cb)
  }
  /*this.getArtist = function(data,cb){
    executeQuery(" ",cb)
  }*/
  this.createCompetition= function(data,cb){
      executeQuery('Truncate table versus')
      executeQuery('insert into versus (song_id) values (?),(?)',data,cb);
  }
  this.getCompetition = function(cb){
    executeQuery("SELECT image_art.src as albumart,song.name,song.src,song.flame_count,song.play_count,song.download_count,user.name as artist FROM song,versus,user,image_art where versus.song_id = song.id and versus.song_id = image_art.song_id and song.user_id = user.id",cb)
  }
  this.get = function(data,cb){
      //executeQuery('select * from user where '+connection.escape(column)+' like ?'+data,cb)
      console.log('select * from user where ?')
      console.log(data);
    executeQuery('select * from song where ?',data,cb)

  }
}
