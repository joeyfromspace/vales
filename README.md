# VALES Website
This is the source code for the [VALES website](http://www.valesvalesvales.com). For reference and work only.
## Editing the Playlist
Content is loaded from an array of objects stored in the `playlist` variable in `js/vales.js`. Follow these instructions to edit the playlist order or make changes:    
```    
[       
    // Item 1
    {            
        id: 0,            
        sources: [     
            { src: 'videos/SALMON_LOOPS_d4.mp4', type: 'video/mp4' },
            { src: 'videos/SALMON_LOOPS_d4.webm', type: 'video/webm' },
            { src: 'videos/SALMON_LOOPS_d4.ogv', type: 'video/ogv' }
        ],
        config: {            
            poster: "images/SALMON_LOOPS.jpg",        
            autoplay: true,
            played: false,
            skipTo: false,
            layout_position: 0,
            playlist_position: 0
        }                
    },
    // Item 2
    {
        id: 1,
        sources: [
            { src: 'videos/SPELL_d4.mp4', type: 'video/mp4' }
        ],
        config: {
            poster: "images/SPELL.jpg",
            autoplay: true
        }
    }
]
```

### Object Properties
***id*** *(int)*

The id is used by the script to read the current track. ID must correspond to the item's position in the list, beginning at 0. Do not forget the comma after the id number!

***sources*** *(array)*

Sources is an array of each video associated with an item. This allows the video playback engine to fallback to another format of the same video should a given format not be compatible with the user's browser. For instance, mp4 playback is not supported in Firefox without installing third-party software. However, Firefox CAN play webm and ogv files. To ensure videos play in Firefox, it is wise to include additional webm or ogv videos in the sources array. Every source must have a `src` and `type` and are surrounded by `{ }` and separated by `,`. See the above example for help.

***config*** *(object)*

Config is an object that contains two parameters. `poster` is the path of the still image thumbnail that is displayed when the video is not playing. `autoplay` should be set to `true` if the video should play automatically.

Setting `skipTo` to true will allow a user to click on a video at any time to make it play (unless it is already playing).

`layout_position` is the order the video should be drawn on the web page, ascending from 0 from right-to-left. 0 is drawn on the left most edge, 1 is drawn to the right and so on.

`playlist_position` is the video's place in the playlist. Again, ascending from 0.

`played` is set by the script after a video has played. There's no reason to change this by hand unless you want a video to always count as played.


## PULL Requests
This is a closed project. Most PULL requests will be rejected. Thanks.

## Credits
Coded by [Joey Lappin](http://www.joeyfromspace.com)