$(document).ready(function() {
    var playlist = [{
        id: 0,
        sources: [{
            type: "video/mp4",
            src: "http://player.vimeo.com/external/122315924.hd.mp4?s=a3b67c8182a406ad28dc9a95634617c1"
        }, ],
        config: {
            poster: "images/SALMON_LOOPS.jpg",
            skipTo: true,
            autoplay: true,
            layout_position: 0,
            playlist_position: 0,
            played: false
        },
    }, {
        id: 1,
        sources: [{
            src: 'http://player.vimeo.com/external/122286383.hd.mp4?s=44faaafa6cbb13b34c3a6d0a418ff4ab',
            type: 'video/mp4'
        }, ],
        config: {
            autoplay: true,
            poster: "images/SPELL.jpg",
            skipTo: true,
            layout_position: 2,
            playlist_position: 1,
            played: false
        }
    }, {
        id: 2,
        sources: [{
            src: "http://player.vimeo.com/external/122286379.hd.mp4?s=2b878a9ded145cad02275003b868c79c",
            type: 'video/mp4'
        }, ],
        config: {
            autoplay: true,
            poster: "images/Fisher_King.jpg",
            skipTo: true,
            layout_position: 4,
            playlist_position: 2,
            played: false
        }
    }, {
        id: 3,
        sources: [{
            src: "http://player.vimeo.com/external/122286381.hd.mp4?s=217cc4ed1c9e9801b610303c83272c9d",
            type: 'video/mp4'
        }, ],
        config: {
            autoplay: true,
            poster: "images/LOOP_LOOP.jpg",
            skipTo: true,
            layout_position: 6,
            playlist_position: 4,
            played: false
        }
    }, {
        id: 4,
        sources: [{
            src: "http://player.vimeo.com/external/122340051.hd.mp4?s=6d07568b059b61530c44e0dc8ac8c145",
            type: 'video/mp4'
        }, ],
        config: {
            autoplay: true,
            poster: "images/BALLOONS.jpg",
            skipTo: true,
            layout_position: 5,
            playlist_position: 5,
            played: false
        }
    }, {
        id: 5,
        sources: [{
            src: "http://player.vimeo.com/external/122315927.hd.mp4?s=ac949e708bc26376d43ed43333ca3392",
            type: 'video/mp4'
        }, ],
        config: {
            autoplay: true,
            poster: "images/SALMON_SONG.jpg",
            layout_position: 3,
            skipTo: true,
            playlist_position: 6,
            played: false
        }
    }, {
        id: 6,
        sources: [{
            src: "http://player.vimeo.com/external/122286382.hd.mp4?s=2cedc1467835adc5beec9f0874a4f30d",
            type: 'video/mp4'
        }, ],
        config: {
            autoplay: true,
            poster: "images/YOUTHFUL_FOLLY.jpg",
            skipTo: true,
            layout_position: 1,
            playlist_position: 7,
            played: false
        }
    }, {
        id: 7,
        sources: [{
            src: "http://player.vimeo.com/external/122315925.hd.mp4?s=ede608c57f636b7900ab11bdc12f7d40",
            type: 'video/mp4'
        }, ],
        config: {
            autoplay: false,
            skipTo: false,
            poster: "images/DOG.jpg",
            layout_position: 7,
            playlist_position: 3,
            played: false
        }
    }, {
        id: 8,
        sources: [{
            src: "http://player.vimeo.com/external/122315929.hd.mp4?s=d6530c7e897a26109c56e42e37f464fe",
            type: 'video/mp4'
        }, ],
        config: {
            autoplay: true,
            skipTo: true,
            poster: "images/stairs.jpg",
            layout_position: 8,
            playlist_position: 8,
            played: false
        }
    }, {
        id: 9,
        sources: [{
            src: "http://player.vimeo.com/external/122286380.hd.mp4?s=51203cf3b1d0ef07a6f95ee37fcaa6e5",
            type: 'video/mp4'
        }, ],
        config: {
            autoplay: true,
            poster: "images/WHALEWATCH.jpg",
            skipTo: true,
            layout_position: 9,
            playlist_position: 9,
            played: false
        }
    }, {
        id: 10,
        sources: [{
            src: "http://player.vimeo.com/external/122315928.hd.mp4?s=9bdd609afdec596c42b21db9fe5d93de",
            type: 'video/mp4'
        }, ],
        config: {
            poster: "images/swimming.jpg",
            skipTo: true,
            autoplay: true,
            layout_position: 10,
            playlist_position: 10,
            played: false
        }
    }];
    var controls = {
        setThumbs: function() {
            var playlistArray = playlist.slice();
            playlistArray.sort(function(a, b) {
                return a.config.layout_position - b.config.layout_position;
            });
            for(var i = 0; i < playlistArray.length; i++) {
                $('.site-container').append('<div class="video-container item-' + playlistArray[i].config.playlist_position + '" data-id="' + playlistArray[i].id + '" data-playlist-position="' + playlistArray[i].config.playlist_position + '" style="background-image: url(' + playlistArray[i].config.poster + ');"></div>')
            };
        },
        playTrack: function(ele) {
            $('.video-container').off();
            var _this = this;
            if(_this.bigVideo) {
                _this.bigVideo.getPlayer().off();
                _this.bigVideo.remove();
                _this.bigVideo = false;
            }
            if(_this.currentPlayer) {
                _this.currentPlayer = false;
            }
            $('.active').removeClass('active');
            $(ele).addClass('active');
            var current = $(ele).attr('data-id');
            var cp = playlist[current];
            _this.currentPlayer = cp;
            $(function() {
                _this.bigVideo = new $.BigVideo({
                    useFlashForFirefox: false,
                    container: $('.active')
                });
                _this.bigVideo.init();
                _this.bigVideo.show(cp.sources);
                _this.bigVideo.getPlayer().on('ended', function(e) {
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    _this.donePlaying(e);
                    return;
                });
            });
            _this.listen();
        },
        start: function() {
            var _this = this;
            _this.setThumbs();
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
        checkNextPlay: function(advance) {
            var _this = this;
            var currentVideo = _this.currentPlayer.config.playlist_position;
            var nextTrack = _this.getNextTrack(advance);
            if(nextTrack) {
                if(nextTrack.config.autoplay) {
                    _this.playTrack('.item-' + nextTrack.config.playlist_position);
                } else {
                    _this.checkNextPlay(advance + 1);
                }
            } else {
                _this.playTrack('.item-0');
            }
            return;
        },
        currentPlayer: false,
        bigVideo: false,
        animating: false,
        getNextTrack: function(advance) {
            var _this = this;
            if(_this.currentPlayer == false) {
                return false;
            }
            var playlistArray = _this.getOrderedPlaylist();
            return playlistArray[(_this.currentPlayer.config.playlist_position + 1 + (advance || 0))] || false;
        },
        donePlaying: function() {
            var _this = this;
            _this.currentPlayer.config.played = true;
            _this.checkNextPlay(0);
            return;
        },
        getOrderedPlaylist: function() {
            var playlistArray = playlist.slice();
            playlistArray.sort(function(a, b) {
                return a.config.playlist_position - b.config.playlist_position;
            });
            return playlistArray;
        }
    };
    controls.start();
});