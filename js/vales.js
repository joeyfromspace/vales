$(document).ready(function() {
    // An array containing each video to be played.
    var playlist = [
            // Begin first playlist item object
            {
                // ID is used to find which item is currently playing. All ID numbers must be ascending from 0 in the order items are placed in the array.
                id: 0,                
                sources: [
                    // For each src, specify the TYPE and SRC properties. For Safari-compatible playback, list mp4 first followed by webm and ogv.
                    { type: 'video/mp4', src: 'videos/SALMON_LOOPS_d4.mp4' },
                    { type: 'video/ogg', src: 'videos/SALMON_LOOPS_d4.ogv'}          
                ],
                config: {
                    // Poster image to display for this video while it's not playing.
                    poster: "images/SALMON_LOOPS.jpg",
                    skipTo: false,
                    // If autoplay is true, video will be played automatically when its predecessor is completed.
                    autoplay: true,
                    // Position in layout ascending from 0
                    layout_position: 0,
                    // Order audio should be played, ascending from 0
                    playlist_position: 0,
                    played: false
                },                
            },
            // End first playlist item object
            {
                id: 1,
                sources: [
                    { src: 'videos/SPELL_d4.mp4', type: 'video/mp4'},
                    { src: 'videos/SPELL_d4.ogv', type: 'video/ogg'}
                ],
                config: {
                    autoplay: true,              
                    poster: "images/SPELL.jpg",
                    skipTo: false,
                    layout_position: 2,
                    playlist_position: 1,
                    played: false
                }     
            },
            {
                id: 2,
                sources: [
                    { src: "videos/FISHER_KING_1_cc.mp4", type: 'video/mp4'},
                    { src: "videos/FISHER_KING_d4.ogv", type: 'video/ogg'}
                ],
                config: {
                    autoplay: false,
                    poster: "images/Fisher_King.jpg",
                    skipTo: false,
                    layout_position: 4,
                    playlist_position: 2,
                    played: false
                }     
            },
            {
                id: 3,
                sources: [
                    { src: "videos/LOOP_LOOP_d5.mp4", type: 'video/mp4' },
                    { src: "videos/LOOP_LOOP_d5.ogv", type: 'video/ogg' }
                ],
                config: {
                    autoplay: false,
                    poster: "images/LOOP_LOOP.jpg",
                    skipTo: false,
                    layout_position: 6,
                    playlist_position: 3,
                    played: false
                }    
            },
            {
                id: 4,
                sources: [
                    { src: "videos/birds.mp4", type: 'video/mp4' },
                    { src: "videos/birds.ogv", type: 'video/ogg' }
                ],
                config: {
                    autoplay: true,
                    poster:"images/birds.jpg",
                    skipTo: false,
                    layout_position: 5,
                    playlist_position: 4,
                    played: false
                }    
            },
            {
                id: 5,
                sources: [
                    { src: "videos/SALMON_SONG_d5.mp4", type: 'video/mp4'},
                    { src: "videos/SALMON_SONG_d5.ogv", type: 'video/ogg'}
                ],
                config: {
                    autoplay: false,
                    poster:"images/SALMON_SONG.jpg",
                    layout_position: 3,
                    skipTo: true,
                    playlist_position: 5,
                    played: false
                }    
            },         
            {
                id: 6,
                sources: [ 
                    { src: "videos/YOUTHFUL_FOLLY_d3.mp4", type: 'video/mp4'},
                    { src: "videos/YOUTHFUL_FOLLY_d3.ogv", type: 'video/ogg'}
                ],
                config: {
                    autoplay: false,
                    poster: "images/YOUTHFUL_FOLLY.jpg",
                    skipTo: false,
                    layout_position: 1,
                    playlist_position: 6,
                    played: false
                }    
            },
            {
                id: 7,
                sources: [ 
                    { src: "videos/stairs.mp4", type: 'video/mp4'},
                    { src: "videos/stairs.ogv", type: 'video/ogg'}
                ],
                config: {
                    autoplay: false,
                    skipTo: false,
                    poster: "images/stairs.jpg",
                    layout_position: 7,
                    playlist_position: 7,
                    played: false
                }    
            },
            {
                id: 8,
                sources: [
                    { src: "videos/WHALEWATCH_d5.mp4", type: 'video/mp4'},
                    { src: "videos/WHALEWATCH_d5.ogv", type: 'video/ogg'}
                ],
                config: {
                    autoplay: false,
                    poster: "images/WHALEWATCH.jpg",
                    skipTo: false,
                    layout_position: 8,
                    playlist_position: 8,
                    played: false
                }    
            },             
            {
                id: 9,
                sources: [
                    { src: "videos/swimming.mp4", type: 'video/mp4'},
                    { src: "videos/swimming.ogv", type: 'video/ogg'}
                ],
                config: {
                    poster: "images/swimming.jpg",
                    skipTo: false,
                    layout_position: 9,
                    playlist_position: 9,
                    played: false
                }    
            }            
    ];
    // Main control object for managing playback and concurrent playback devices.
    var controls = {
        setThumbs: function() {
            var playlistArray = playlist.slice();
            playlistArray.sort(function(a,b) {
                return a.config.layout_position - b.config.layout_position;
            });
            // For each video in the playlist, append a div to .site-container with the video's poster as background image.
            for (var i = 0; i < playlistArray.length; i++) {
                $('.site-container').append('<div class="video-container item-'+playlistArray[i].config.playlist_position+'" data-id="'+playlistArray[i].id+'" data-playlist-position="'+playlistArray[i].config.playlist_position+'" style="background-image: url('+playlistArray[i].config.poster+');"></div>')
            };
        },
        playTrack: function(ele) {
            // Kill old event listeners.
            $('.video-container').off(); 
            $('html').off('scroll');
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
            $(function() {
                _this.bigVideo = new $.BigVideo({container:$('.active')});
                _this.bigVideo.init();
                _this.bigVideo.show(cp.sources);
                _this.bigVideo.getPlayer().on('ended', function(e) {
                    _this.donePlaying(e);
                    return;
                });
            });
            // Activate listener method
            _this.listen();                     
        },
        start: function() {
            var _this = this;
            // Build player object.         
            // Build thumbs divs
            _this.setThumbs();
            // Start playing from the first track.
            _this.playTrack('.item-0');
            return;
        },
        listen: function() {
            var _this = this;
            // jQuery click listener for changing current playing track.
            $('.video-container').on('click', function(e) {             
                e.preventDefault();     
                e.stopImmediatePropagation();
                // If player div was clicked, do nothing.
                if($(this).hasClass('active')) { return; }
                // If player is part of the queue, do nothing.
                if((typeof(playlist[($(e.currentTarget).attr('data-playlist-position') - 1)]) != 'undefined' && playlist[($(this).attr('data-playlist-position') - 1)].config.played) || playlist[$(this).attr('data-id')].config.skipTo)  {
                    _this.playTrack(e.currentTarget);                
                }
                return;                
            });
        },
        checkNextPlay: function(event) {
            var _this = this;
            // Figure out which video we're currently watching.
            var currentVideo = _this.currentPlayer.config.playlist_position;
            var nextVideo = _this.getNextTrack().config.playlist_position, autoplay = _this.getNextTrack().config.autoplay;            
            // Start from first video if current is the last.
            if(currentVideo == playlist.length - 1) { _this.playTrack('.item-0'); return; }
            // Find the next video in the playlist array with autoplay enabled.                
            if(autoplay) {                    
                _this.playTrack('.item-'+nextVideo);
                return;
            }
        },     
        currentPlayer: false,
        bigVideo: false,
        animating: false,        
        getNextTrack: function() {
            var _this = this;
            if(_this.currentPlayer == false) { return; }
            return playlist[(_this.currentPlayer.config.playlist_position + 1)];
        },
        donePlaying: function(e) {
            var _this = this;
            _this.currentPlayer.config.played = true;
            _this.checkNextPlay(e);
            return;
        }
    };
    // Instantiate controller when DOM is loaded.
    controls.start();
});