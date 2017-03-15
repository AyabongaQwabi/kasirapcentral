module.exports = function(connection){



  var executeQuery = function(query, data, cb){
      connection.query(query, data, cb);
  };

  this.getFeatured = function(cb){
      executeQuery('select featured_video.video_id , video.url ,video.name as name ,user.id as user_id,user.name as artist ,thumbnail.src as thumbnail from featured_video,video,user, thumbnail where featured_video.video_id =video.id and video.user_id = user.id and thumbnail.video_id = video.id',cb);
  }
  this.getVideos= function(cb){
      executeQuery('select * from video',cb);
  }
}
