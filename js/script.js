var audio;
initAudio($('#playlist li:first-child'));
function initAudio(element){
	var song = element.attr('song');
	var artist = element.attr('artist');
	var title = element.text();
	var cover = element.attr('cover');

	audio = new Audio('media/' +song);

	$('.artist').text(artist);
	$('.title').text(title);
	$('.cover').attr('src', 'images/covers/'+cover);

	$('#playlist li').removeClass('active');
	element.addClass('active');
}

initAudio($('#playlist li:first-child'))

$('#pause').hide();

$('#play').on('click', function(){
	audio.play();
	$('#play').hide();
	$('#pause').show();
	showDuration()
})

$('#pause').on('click', function(){
	audio.pause();
	$('#play').show();
	$('#pause').hide();
})

$('#stop').on('click', function(){
	audio.pause();
	audio.currentTime = 0;
})

$('#next').on('click', function(){
	audio.pause();
	var next = $('#playlist li.active').next();
	if(next.length==0){
		 next = $('#playlist li:first-child');
	}
	initAudio(next);
	audio.play();
	showDuration();
	$('#play').hide();
	$('#pause').show();
})

$('#prev').on('click', function(){
	audio.pause();
	var prev = $('#playlist li.active').prev();
	if(prev.length==0){
		prev = $('#playlist li:last-child');
	}
	initAudio(prev);
	audio.play();
	showDuration();
	$('#play').hide();
	$('#pause').show();
})

$('#playlist li').on('click', function(){
	audio.pause();
	initAudio($(this));
	$('#play').hide();
	$('#pause').show();
	audio.play();
	showDuration();
})

$('#volume').change(function(){
	audio.volume = parseFloat(this.value/100);
})

function showDuration(){
	$(audio).bind('timeupdate', function(){
		//get hours and mins
		var second = parseInt(audio.currentTime % 60);
		var min = parseInt(audio.currentTime / 60) % 60;
		if (second<10) {
			second = '0' + second;
		}

		$('#duration').html(min + ':' + second);

		var value = 0;
		if (audio.currentTime>0) {
			value = Math.floor((100/audio.duration)*audio.currentTime);
		}

		$('#progress').css('width', value+'%');
	})
}