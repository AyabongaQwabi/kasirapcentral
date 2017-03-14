var currentEl;

function restoreLevel(item) {
    console.log('\n Restoring item at play to natural state')
    $(item).children('.first').toggle();
    $(item).children('.info').toggle();
    $(item).children('.first').height(height)
}

function displayProgressBar(el) {
    $(el).siblings(".hp_slide").css('display', 'inline-block');
    console.log($(el).siblings(".hp_slide"))
}

function hideProgressBar(el) {
    $(el).siblings(".hp_slide").css('display', 'none');
    console.log($(el).siblings(".hp_slide"))
    el.src = '/img/play.png'
}

function playSound(el, soundfile) {
    function handleProgressBar(elm) {
        if (currentEl) {
            currentEl.mp3.pause();
            hideProgressBar(currentEl)
            restoreLevel($(currentEl).parent().parent())
            displayProgressBar(elm)
            currentEl = elm
        } else {
            currentEl = elm
            displayProgressBar(elm)
        }
    }

    function handleButtonIcon() {
        if (currentEl) {

        }
    }
    if (el.mp3) {
        if (el.mp3.paused) {
            el.mp3.play();
            el.src = '/img/pause.png'
            handleProgressBar(el)

        } else {
            el.mp3.pause();
            el.src = '/img/play.png'
        }
    } else {
        el.mp3 = new Audio(soundfile);
        el.mp3.play();
        el.src = '/img/pause.png'
        handleProgressBar(el)

    }
    $(el.mp3).on("timeupdate", function(e) {
        console.log('time')
        var currentTime = this.currentTime;
        var duration = this.duration;
        $('.hp_range').stop(true, true).animate({
            'width': (currentTime + .25) / duration * 100 + '%'
        }, 250, 'linear');
    })

}var height = 0;
$('.chart li').mouseenter(function() {
    if ($(this).children('span.second').children('img.play').attr('src') == $(currentEl).attr('src')) {
        console.log('leaving.Note: This element is at play')
    } else {
        $(this).children('.info').toggle();
        $(this).children('.first').toggle();
        height = $(this).children('.first').height()
        $(this).children('.first').height('10px')
    }



})

$('.chart li').mouseleave(function() {
    if ($(this).children('span.second').children('img.play').attr('src') == $(currentEl).attr('src')) {
        console.log('leaving.Note: This element is at play')
    } else {
        $(this).children('.first').toggle();
        $(this).children('.info').toggle();
        $(this).children('.first').height(height)
        console.log('leaving. element not busy')
        console.log('proof')
        console.log($(this).children('span.second').children('img.play').attr('src'))
        console.log($(currentEl))
    }
    /*$(this).children('.first').toggle();
    $(this).children('.info').toggle();
    $(this).children('.first').height(height) */
})
$('.heat').click(function() {
    console.log('heat click')
    console.log($(this).attr('src'))
    if ($(this).attr('src') == '/img/heat.png') {
        $(this).attr('src', '/img/redfire.png')
    } else {
        $(this).attr('src', '/img/heat.png')
    }

})
