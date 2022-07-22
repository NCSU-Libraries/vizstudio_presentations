# Vizstudio Presentations

An HTML/CSS/Javascript framework for creating multimedia presentations in the visualization Studio at D.H. Hill, Jr. Library.

> This project is a work in progress. If you have ideas for new functionality, please submit an issue.


## Demo

> TK - LINK TO DEMO CONTENT AND INSTRUCTIONS TO GET IT RUNNING


## Basic concepts

* A presentation is composed of one or more scenes.

* A scene is a set of elements displayed at the same time in different positions around the room. Elements can be images, video, or native web content (HTML + Javascript + CSS).

   > NOTE: Use of standalone audio content is planned but not yet supported.

* Elements are arranged horizontally around the room according to a prescribed layout.

* Layouts are built using a grid that divides the room into zones of equal widths.
The default grid divides the room into 12 zones, which can be combined to create layouts of 2, 3 ,4 , 6 and 12 equal-width zones, or any number of combinations of mixed-width zones.
8- and 10-zone grids are also available.

* The layout and content of each scene is defined via a Javascript configuration file.
Scenes are presented in the order in which they are defined in this file. See below for details.

* Movement between scenes is controlled via the keyboard. 

   > TODO: Enable self-running presentations that advance automatically wihtout keyboard input



## Directory structure and overview of included files

* `css/` - All CSS files are in here
  * `vizstudio.css` - Base styles from [Visualization Studio HTML Framework](https://github.ncsu.edu/ncsu-libraries/vizstudio_html_framework)
  * `vizstudio_grid10` - Additional styles required for 10-zone layouts
  * `vizstudio_grid8` - Additional styles required for 8-zone layouts
  * `vizstudio_prez.css` - Styles for this presentation framework. To override any of these, link a separate CSS file after this one that overrides these declarations. Avoid editing this file.
* `js/` - All Javascript files go in here
  * `config.js` - Presentation configuration - this is the main file you'll deal with
  * `config_example.js` - A sample conifugration file demonstrating various scene layouts and content combinations.
  * `transform_scale.js` - A utility that scales the display down to fit a laptop or desktop monitor.
  * `vizprez.js` - The main Javascript that makes everything work. Don't mess with this file unless you know what you're doing and maybe not even then.
  * `vizstudio_utils.js` - A bunch of utility functions that are shared between Vizstudio projects. Leave it alone, or add new functions at the end.
* `media/` - All media files for presentations should go here, preferably in appropriate subdirectories:
  * `audio/` (MP3, WAV)
  * `images/` (JPG, PNG)
  * `video/` (MP4, M4V, OGG)
* `index.html` - The base HTML file – all content is presented via this file
* `README.md` - The file you are reading right now.
* `zip.sh` - A Linux/Mac shell script to zip presentation files for transfer


## Layouts

> The grid system is described in more detail in the 
[Visualization Studio HTML Framework](https://github.com/NCSU-Libraries/vizstudio_html_framework).

Layouts are built using a grid that divides the room into zones of equal widths.
The default grid divides the room into 12 zones, which can be combined to create layouts of 2, 3 ,4 , 6 and 12 equal-width zones, or any number of combinations of mixed-width zones.
8- and 10-zone grids are also available.

### Zones

The default CSS uses a 12-zone grid, with each zone being 1280 pixels wide. Other configurations are available by spanning zones - see below.

![12-zone grid](/media/images/readme/12-grid.png "12-zone grid")

#### Spanning zones

The width of a zone can be extended to span zones to its right. The image below shows a few examples of spanning zones to create different layouts. Many other combinations are possible.

![12-zone grid layout examples](/media/images/readme/12-grid-span.png "12-zone grid layout examples")

Using the default 12-zone grid, you can combine position and span classes to achieve a layout with 1, 2, 3, 4, 6 or 12 equal-width zones. Here's's the HTML for a layout with 4 equal-width zones (i.e. each occupying one quareter of the space):

### Alternate grids

#### 8-zone grid

The 8-zone grid divides the display into 8 zones, each 1920 pixels wide.

![8-zone grid](/media/images/readme/8-grid.png "8-zone grid")

Using the 8-zone grid, you can combine position and span classes to achieve a grid of 1, 2, 4, or 8 equal-width zones. Other layouts are possible using span classes.


#### 10-zone grid

The 10-zone grid divides the display into 10 zones, each 1536 pixels wide. A grid of 5 equal-width zones can be achieved with spanning.

![10-zone grid](/media/images/readme/10-grid.png "10-zone grid")


## Building a presentation (via Javascript configuration)

`js/config.js` is used to define the presentation content. The default `config.js` file looks like this:

```
function config() {
  var conf = new VizPrezConfig();
  // *** No edits above here ***


  // Set transition interval (fade time) in milliseconds
  conf.transitionInterval = 1000


  // Define scenes here via conf.addScene() – see README for instructions


  // *** No edits below here ***
  return conf;
}
```

### Presentation settings

Currently there is only one setting that applies to the whole presentation:

```
conf.transitionInterval = 1000
```

This specifies the speed of the crossfade transition between scenes (in miliseconds)


### Adding Scenes: `conf.addScene()`

Scenes are added using the `conf.addScene()` function. Scenes are presented in the order in which they appear in this file. 

#### `layout`

The `layout` element is an array (list) of zone definitions (see below).

```
  conf.addScene({
    layout: [
      
      *** Zone definitions go here (see below) ***
      
    ]
  })
```


#### Zone definitions

The `layouts` array contains one or more zone definitions, which are Javascript objects with this format.

```
{
  zone: <integer indicating the primary zone number (1-12)>,
  span: <number of zones to combine, begining with this one and moving right> (OPTIONAL, 1-12),
  contentType: <'image', 'video', or 'html' >,
  filepath: <path from root to the content file (for image or video)> (REQUIRED FOR 'video' or 'image' contentType),
  content: <raw HTML text for 'html' contentType> (REQUIRED FOR 'html' contentType)
}
```

#### Scene example

Here is an example of a scene using the default 12-zone grid, with alternating short (video) and long (image) zones:

```
conf.addScene({
 layout: [
   { zone: 1, contentType: 'video', filepath: 'media/video/vid1.mp4' },
   { zone: 2, span: 2, contentType: 'image', filepath: 'media/images/img1.png' },
   { zone: 4, contentType: 'video', filepath: 'media/video/vid2.mp4' },
   { zone: 5, span: 2, contentType: 'image', filepath: 'media/images/img2.png' },
   { zone: 7, contentType: 'video', filepath: 'media/video/vid3.mp4' },
   { zone: 8, span: 2, contentType: 'image', filepath: 'media/images/img3.png' },
   { zone: 10, contentType: 'video', filepath: 'media/video/vid4.mp4' },
   { zone: 11, span: 2, contentType: 'image', filepath: 'media/images/img4.png' },
 ]
})
```

See [`js/config_example.js`](js/config_example.js) for more examples.


### Using custom HTML/Javascript

Using custom, dynamic HTML content requires these steps:

1. Create custom Javascript and CSS files and copy them to `js/` and `css/` respectively.
2. Edit `.index.html` to include your custom Javascript and CSS. See comments in the file for more info.
3. Add HTML to the scene configuration as `content`. In a common scneario, this would be an HTML element targeted by your Javascript.

   ```
   {
     zone: 1, contentType: 'html', content: '<div id="hello"></div>'
   }
   ```


## Content requirements and considerations

* For best results, video files and images should be created at the size they will display (see zone dimensions above).

* Videos and images will be scaled (up or down) to fit the display height (1080 px). This may result in the sides of the video being "cropped" (if too wide), or its being centered in the available space with blank space on each side (if too narrow).





