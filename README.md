# Vizstudio Presentations

An HTML/CSS/Javascript framework for creating multimedia presentations in the visualization Studio at D.H. Hill, Jr. Library.

> This project is a work in progress. If you have ideas for new functionality, please submit an issue.


## Demo

> TK - LINK TO DEMO CONTENT AND INSTRUCTIONS TO GET IT RUNNING


## Basic concepts

* A presentation is composed of one or more scenes.

* A scene is a set of elements displayed at the same time in different positions around the room. Elements can be images, video, or native web content (HTML + Javascript + CSS).

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

### Using alternate grids

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

### Adding Scenes

Scenes are added using the `conf.addScene()` function. Scenes are presented in the order in which they appear in this file. 

The content of each zone is specified in the `layout` section. The objects in the `layouts` array have this format:

    ```
    {
      zone: <integer indicating the primary zone number (e.g. 1-12)>,
      span: <number of zones to combine, begining with this one and moving right> (OPTIONAL),
      contentType: <'image', 'video', or 'html' >,
      filepath: <path from root to the content file (for image or video)> (REQUIRED FOR 'video' or 'image' contentType),
      content: <raw HTML text for 'html' contentType> (REQUIRED FOR 'html' contentType)
    }
    ```

Here is an example of a scene with 12 different images, using the default 12-zone grid:

```
  conf.addScene({
    layout: [
      { zone: 1, contentType: 'image', filepath: 'media/images/img1.png' },
      { zone: 2, contentType: 'image', filepath: 'media/images/img2.png' },
      { zone: 3, contentType: 'image', filepath: 'media/images/img3.png' },
      { zone: 4, contentType: 'image', filepath: 'media/images/img4.png' },
      { zone: 5, contentType: 'image', filepath: 'media/images/img5.png' },
      { zone: 6, contentType: 'image', filepath: 'media/images/img6.png' },
      { zone: 7, contentType: 'image', filepath: 'media/images/img7.png' },
      { zone: 8, contentType: 'image', filepath: 'media/images/img8.png' },
      { zone: 9, contentType: 'image', filepath: 'media/images/img9.png' },
      { zone: 10, contentType: 'image', filepath: 'media/images/img10.png' },
      { zone: 11, contentType: 'image', filepath: 'media/images/img11.png' },
      { zone: 12, contentType: 'image', filepath: 'media/images/img12.png' }
    ]
  })
  ```

See [`js/config_example.js`](js/config_example.js) for more examples.


### Presentation settings

Currently there is only one setting that applies to the whole presentation:

```
conf.transitionInterval = 1000
```

This specifies the speed of the crossfade transition between scenes (in miliseconds)


### Using custom HTML/Javascript

Using custom, dynamic HTML content requires these steps:

1. Create custon Javascript and CSS files and copy them to `js/` and `css/` respectively
2. Edit `.index.html` to include your custom Javascript and CSS. See comments in the file for more info.
3. Add HTML to the scene configuration as `content` (see above). It's recommended to limit this to a single HTML element (e.g. a `<div>`), and to use Javascript to insert content into that element.


## Content requirements and considerations

### Video

> TK

### Images

> TK

### Audio

> TODO - Enable audio content




