function loadForm(){
  $('.form-fields').css('display','block')
}


var currentEl;
/************************************
  Song Analytics Update functions [AJAX]
*************************************/
function updatePlayCount(el){
  console.log('Updating play count')
  var data ={song_id:el.id}
  console.log(data)
    $.post('/update/play/',data,function(data){
        $(el).siblings('.analytics').children('.play_count').html(data.plays)
        console.log('Succesfully updated play')
    }).fail(function(err){
      console.log('Post Failed Due to')
      console.log(err )
    })
}
function updateFlameCount(el){
  console.log('Updating flame count')
  var data ={song_id:el.id}
  console.log(data)
    $.post('/update/flame/',data,function(data){
        $(el).siblings('.analytics').children('.flame_count').html(data.flames)
        console.log('Succesfully updated flame')
    }).fail(function(err){
      console.log('Post Failed Due to')
      console.log(err )
    })
}
function updateDownloadCount(el){
  console.log('Updating download count')
  var data ={song_id:el.id}
  console.log(data)
    $.post('/update/download/',data,function(data){
        $(el).parent().siblings('.analytics').children('.download_count').html(data.downloads)
        console.log('Succesfully updated download')
    }).fail(function(err){
      console.log('Post Failed Due to')
      console.log(err )
    })
}



/***************************************
  Clicck operations
***************************************/


function restoreLevel(item) {
    console.log('\n Restoring item at play to natural state')
    $(item).children('.first').toggle();
    $(item).children('.info').toggle();
}

function displayProgressBar(el) {
    $(el).siblings(".hp_slide").css('visibility', 'visible');
    //console.log($(el).siblings(".hp_slide"))
    console.log('**shows progress bar**')
}

function hideProgressBar(el) {
    $(el).siblings(".hp_slide").css('visibility', 'collapse');
    //console.log($(el).siblings(".hp_slide"))
    el.src = '/img/play.png'
    console.log('**hides progress bar**')
}

function playSound(el, soundfile) {
    function handleProgressBar(elm) {
        console.log('handling progress bar')
        if (currentEl) {
            console.log("There's an item currently playing")
            if(currentEl == elm){
              console.log('and its the same as the one being clicked')
              if (elm.mp3.paused){
                console.log('this element is paused')
                console.log('so im gonna leave play it')
                displayProgressBar(elm)
                $(elm).addClass('played')

              }
              else{
                console.log('this element is playing')
                console.log('so im gonna leave it like that')
                //displayProgressBar(elm)
                //elm.mp3.pause();
              }
            }
            else{
              console.log('and its not the same as the one being clicked')
              console.log('So im gonna hide progress bar for the current one')
              console.log("and then pause it")
              currentEl.mp3.pause()

              hideProgressBar(currentEl)
              $(currentEl).removeClass('played')
              console.log('then show progress bar for this one')
              displayProgressBar(elm)
              currentEl = elm
              console.log('**sets this item as the one currently being played**')
            }




        } else {
            console.log('Theres no item currently playing ')
            currentEl = elm
            console.log('so this one is the one currently playing now')
            displayProgressBar(elm)
        }
    }

    function handleButtonIcon() {
        if (currentEl) {

        }
    }
    console.log('\n\nPlay button clicked')
    if (el.mp3) {
        console.log("Song already loaded on element")
        if (el.mp3.paused) {
            console.log(' mp3 is paused')
            console.log(' playing the mp3')
            el.mp3.play();
            el.src = '/img/pause.png'
            $(el).addClass('played')
            handleProgressBar(el)

        } else {
            console.log('pausing the mp3')
            el.mp3.pause();
            $(el).removeClass('played')
            el.src = '/img/play.png'
        }
    } else {
        console.log("loading song on element")
        el.mp3 = new Audio(soundfile);
        updatePlayCount(el)
        console.log(' playing the mp3')
        el.mp3.play();
        el.src = '/img/pause.png'
        $(el).addClass('played')
        handleProgressBar(el)

    }
    $(el.mp3).on("timeupdate", function(e) {
        console.log('playing ...')
        var currentTime = this.currentTime;
        var duration = this.duration;
        $('.hp_range').stop(true, true).animate({
            'width': (currentTime + .25) / duration * 100 + '%'

        }, 250, 'linear');
    })

}
var height = 0;
$('.chart li').mouseenter(function() {
    if ($(this).children('span.second').children('img.play').attr('src') == $(currentEl).attr('src')) {
        console.log('leaving.Note: This element is at play')
    } else {
        $(this).children('.info').toggle();
        $(this).children('.first').toggle();
        height = $(this).children('.first').height()

    }



})

$('.chart li').mouseleave(function() {
    if ($(this).children('span.second').children('img.play').attr('src') == $(currentEl).attr('src')) {
        console.log('leaving.Note: This element is at play')
    } else {
        $(this).children('.first').toggle();
        $(this).children('.info').toggle();
        console.log('leaving. element not busy')
        console.log('proof')
        console.log($(this).children('span.second').children('img.play').attr('src'))
        console.log($(currentEl))
    }
    /*$(this).children('.first').toggle();
    $(this).children('.info').toggle();
    $(this).children('.first').height(height) */
})

function flame(el){
  if (!el.flamed){
    updateFlameCount(el)
    el.flamed = true;
  }
  console.log('heat click')
  console.log($(el).attr('src'))
  console.log(el.src == '/img/heat.png')
  if (!$(el).hasClass('flamed')) {
      $(el).addClass('flamed')
  } else {
      $(el).removeClass('flamed')
  }
}
function download(el){
  if (!el.downloaded){
    updateDownloadCount(el)
    el.downloaded = true;
  }
  if (!$(el).hasClass('downloaded')) {
      $(el).addClass('downloaded')
  } else {
      $(el).removeClass('downloaded')
  }
}
