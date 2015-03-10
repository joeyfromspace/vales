$(document).ready(function() {
    // An array containing each video to be played.
    var playlist = [
            {
                id: 0,
                sources: [
                    { src: 'videos/SALMON_LOOPS_d4.mp4', type: 'video/mp4'}
                ],
                config: {                    
                    poster: "images/SALMON_LOOPS.jpg",
                    autoplay: true
                }                
            },
            {
                id: 1,
                sources: [
                    { src: 'videos/SPELL_d4.mp4', type: 'video/mp4'}
                ],
                config: {
                    autoplay: true,              
                    poster: "images/SPELL.jpg"
                }     
            },
            {
                id: 2,
                sources: [
                    { src: "videos/FISHER_KING_d4.mp4", type: 'video/mp4'}
                ],
                config: {
                    autoplay: false,
                    poster: "images/Fisher_King.jpg"
                }     
            },
            {
                id: 3,
                sources: [
                    { src: "videos/LOOP_LOOP_d5.mp4", type: 'video/mp4' }
                ],
                config: {
                    autoplay: false,
                    poster: "images/LOOP_LOOP.jpg"
                }    
            },
            {
                id: 4,
                sources: [
                    { src: "videos/birds.mp4", type: 'video/mp4' }
                ],
                config: {
                    autoplay: true,
                    poster:"images/birds.jpg"
                }    
            },
            {
                id: 5,
                sources: [
                    { src: "videos/SALMON_SONG_d5.mp4", type: 'video/mp4'}
                ],
                config: {
                    autoplay: false,
                    poster:"images/SALMON_SONG.jpg"
                }    
            },         
            {
                id: 6,
                sources: [ 
                    { src: "videos/YOUTHFUL_FOLLY_d3.mp4", type: 'video/mp4'}
                ],
                config: {
                    autoplay: true,
                    poster: "images/YOUTHFUL_FOLLY.jpg"
                }    
            },  
            {
                id: 7,
                sources: [
                    { src: "videos/WHALEWATCH_d5.mp4", type: 'video/mp4'}
                ],
                config: {
                    autoplay: false,
                    poster: "images/WHALEWATCH.jpg"
                }    
            },             
            {
                id: 8,
                sources: [
                    { src: "videos/swimming.mp4", type: 'video/mp4'}
                ],
                config: {
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
            // Kill old event listeners.
            $('.video-container').off(); 
            // Function for changing the playing track.
            var _this = this;
            // Make sure we destroy the existing player before we play the next one.            
            if(_this.bigVideo) {
                _this.bigVideo.remove();
                _this.bigVideo = false;
            }
            $('.active').removeClass('active');
            $(ele).addClass('active');
            var current = $(ele).attr('data-id');
            // Instantiate the current player
            var cp = playlist[current];            
            _this.currentPlayer = cp;
            var getSources = function(cp) {
                var sources = [];
                for(var i = cp.sources.length - 1; i >= 0; i--) {
                    sources.push({type: cp.sources[i].src, src: cp.sources[i].src});
                }
                return sources;
            };
            $(function() {
                _this.bigVideo = new $.BigVideo({useFlashForFirefox:false, container:$('.active')});
                _this.bigVideo.init();
                _this.bigVideo.show(getSources(cp));
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
                // Otherwise we figure out what to play next and detach the event handler to prevent chaos.                  
                _this.playTrack(e.currentTarget);                
            });
            // Event listener for when a video ends.
            _this.bigVideo.onEnded = function(e) {
                _this.checkNextPlay(e);
            };
        },
        checkNextPlay: function(event) {
            var _this = this;
            // Figure out which video we're currently watching.
            var currentVideo = _this.currentPlayer.id;
            // Start from first video if current is the last.
            if(currentVideo == playlist.length - 1) { _this.playTrack('.item-0'); return; }
            // Find the next video in the playlist array with autoplay enabled.
            for (var i = 0; i < playlist.length; i--) {                    
                if(i > currentVideo && playlist[i].config.autoplay == true) {                    
                    _this.playTrack('.item-'+i);
                }
            };
        },     
        currentPlayer: false,
        bigVideo: false
    };
    // Instantiate controller when DOM is loaded.
    controls.start();
});