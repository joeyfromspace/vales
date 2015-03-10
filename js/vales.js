$(document).ready(function() {
    // An array containing each video to be played.
    var playlist = [
            {
                sources: [
                    { src: 'videos/SALMON_LOOPS_d4.mp4', type: 'video/mp4'}
                ],
                config: {                    
                    poster: "images/SALMON_LOOPS.jpg",
                    autoplay: true,
                    disablePause: true
                }                
            },
            {
                sources: [
                    { src: 'videos/SPELL_d4.mp4', type: 'video/mp4'}
                ],
                config: {
                    autoplay: true,
                    controls: false,                    
                    poster: "images/SPELL.jpg"
                }     
            },
            {
                sources: [
                    { src: "videos/FISHER_KING_d4.mp4", type: 'video/mp4'}
                ],
                config: {
                    autoplay: false,
                    controls: false,
                    poster: "images/Fisher_King.jpg"
                }     
            },
            {
                sources: [
                    { src: "videos/LOOP_LOOP_d5.mp4", type: 'video/mp4' }
                ],
                config: {
                    autoplay: false,
                    controls: false,
                    poster: "images/LOOP_LOOP.jpg"
                }    
            },
            {
                sources: [
                    { src: "videos/birds.mp4", type: 'video/mp4' }
                ],
                config: {
                    autoplay: true,
                    controls: false,
                    poster:"images/birds.jpg"
                }    
            },
            {
                sources: [
                    { src: "videos/SALMON_SONG_d5.mp4", type: 'video/mp4'}
                ],
                config: {
                    autoplay: false,
                    controls: false,
                    poster:"images/SALMON_SONG.jpg"
                }    
            },         
            {
                sources: [ 
                    { src: "videos/YOUTHFUL_FOLLY_d3.mp4", type: 'video/mp4'}
                ],
                config: {
                    autoplay: true,
                    controls: false,
                    poster: "images/YOUTHFUL_FOLLY.jpg"
                }    
            },  
            {
                sources: [
                    { src: "videos/WHALEWATCH_d5.mp4", type: 'video/mp4'}
                ],
                config: {
                    autoplay: false,
                    controls: false,
                    poster: "images/WHALEWATCH.jpg"
                }    
            },             
            {
                sources: [
                    { src: "videos/swimming.mp4", type: 'video/mp4'}
                ],
                config: {
                    autoplay: false,
                    controls: false,
                    poster: "images/swimming.jpg" 
                }    
            }            
    ];
    // Main control object for managing playback and concurrent playback devices.
    var controls = {
        setThumbs: function() {
            // For each video in the playlist, append a div to .site-container with the video's poster as background image.
            for (var i = 0; i < playlist.length; i++) {
                $('.site-container').append('<div class="video-container item-'+i+'" data-id="'+i+'" style="background-image: url('+playlist[i].config.poster+');"></div>')
            };
        },
        playTrack: function(ele) {
            // Function for changing the playing track.
            var _this = this;
            // Make sure we destroy the existing player before we play the next one.            
            $('video').remove();
            $('.active').removeClass('active');
            $(ele).addClass('active');
            var current = $(ele).attr('data-id');
            // Instantiate the current player
            var cp = playlist[current];            
            _this.currentPlayer = cp;
            $('.active').append(function() {
                var getExt = function(file) {
                    return file.substr(file.indexOf(".") + 1);
                }
                var output = '<video autoplay="true" poster="'+cp.config.poster+'">';
                for(var i = cp.sources.length - 1; i >= 0; i--) {
                    output = output+'<source id="'+getExt(cp.sources[i].src)+'" type="'+cp.sources[i].type+'" src="'+cp.sources[i].src+'"></source>';
                }
                return output + '</video>';
                
            });
            // Activate listener method
            _this.listen();                     
        },
        start: function() {
            var _this = this;
            // Build player object.         
            _this.makePlayers(playlist);
            // Build thumbs divs
            _this.setThumbs();
            // Start playing from the first track.
            _this.playTrack('.item-0');
        },
        listen: function() {
            var _this = this;
            // jQuery click listener for changing current playing track.
            $('.video-container').on('click', function(e) {                
                e.preventDefault();     
                e.stopImmediatePropagation();
                // If player div was clicked, do nothing.
                if($(this).hasClass('active')) { return; }
                // Otherwise we figure out what to play next.                 
                _this.playTrack(e.currentTarget);                
            });
            var video = document.getElementsByTagName('video')[0];
            video.onended = function(e) {
                _this.checkNextPlay(e);
            };
            // Instantiate the Projekktor listener for state changes.

        },
        makePlayers: function(playlistArray) {
            var _this = this;
            for (var i = playlistArray.length - 1; i >= 0; i--) {
                _this.players[i] = {
                    volume: 0.8,
                    imageScaling: 'fill',
                    videoScaling: 'fill',
                    playerFlashMP4: 'swf/StrobeMediaPlayback/StrobeMediaPlayback.swf',
                    controls: false,
                    autoplay:true,
                    playlist: playlistArray[i]
                };
            };
        },
        checkNextPlay: function(event) {
            var _this = this;
            // Figure out which video we're currently watching.
            var currentVideo = $('video').parentsUntil('.site-container').attr('data-id');
            // Start from first video if current is the last.
            if(currentVideo == playlist.length - 1) { _this.playTrack('.item-0'); return; }
            // Find the next video in the playlist array with autoplay enabled.
            for (var i = 0; i < playlist.length; i--) {                    
                if(i > currentVideo && playlist[i].config.autoplay == true) {                    
                    _this.playTrack('.item-'+i);
                }
            };
        },
        players: [],        
        currentPlayer: false
    };
    // Instantiate controller when DOM is loaded.
    controls.start();
//     $('.credits').on('click', function(e) {        
//         e.preventDefault();
//         e.stopImmediatePropagation();
//         $('#wrapper').wrap('<div class="overlay"></div>');
//         $('.credits-dialog').addClass('open');
//     });
});