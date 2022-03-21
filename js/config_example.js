function config() {
  var conf = new VizPrezConfig();

// *** No edits above here ***


  // Set transition interval (fade time) in milliseconds
  conf.transitionInterval = 1000


  // Below are some examples of defining scenes with different layouts and content types


  // Scene - one big image spanning the whole room (one zone that spans all 12 zones of the grid)
  // The 'contentType' value is set to 'image', and the 'filepath' value is the relative path to the image file
  conf.addScene({
    layout: [
      { zone: 1, span: 12, contentType: 'image', filepath: 'media/images/pano.png' }
    ]
  })


  // Scene - 12 zones, alternating image and video
  // This layout doesn't use any spans
  // The 'contentType' values are set to 'image' or 'video' as appropriate
  //   and again the 'filepath' values specify where the content files are
  conf.addScene({
    layout: [
      { zone: 1, contentType: 'image', filepath: 'media/images/fake_charts1.png' },
      { zone: 2, contentType: 'video', filepath: 'media/video/microbes/mix2.mp4' },
      { zone: 3, contentType: 'image', filepath: 'media/images/fake_charts2.png' },
      { zone: 4, contentType: 'video', filepath: 'media/video/microbes/mix3.mp4' },
      { zone: 5, contentType: 'image', filepath: 'media/images/fake_charts3.png' },
      { zone: 6, contentType: 'video', filepath: 'media/video/microbes/mix5.mp4' },
      { zone: 7, contentType: 'image', filepath: 'media/images/fake_charts4.png' },
      { zone: 8, contentType: 'video', filepath: 'media/video/microbes/mix7.mp4' },
      { zone: 9, contentType: 'image', filepath: 'media/images/fake_charts2.png' },
      { zone: 10, contentType: 'video', filepath: 'media/video/microbes/mix8.mp4' },
      { zone: 11, contentType: 'image', filepath: 'media/images/fake_charts3.png' },
      { zone: 12, contentType: 'video', filepath: 'media/video/microbes/mix11.mp4' }
    ]
  })
 

  // Scene - 6 wide zones
  // Each of the zones in this layout span 2 zones. Note that the 'zone' values skip every other number.
  conf.addScene({
    layout: [
      { zone: 1, span: 2, contentType: 'image', filepath: 'media/images/beach_2-10.png' },
      { zone: 3, span: 2, contentType: 'image', filepath: 'media/images/desert_2-10.png' },
      { zone: 5, span: 2, contentType: 'image', filepath: 'media/images/forest_2-10.png' },
      { zone: 7, span: 2, contentType: 'image', filepath: 'media/images/prarie_2-10.png' },
      { zone: 9, span: 2, contentType: 'image', filepath: 'media/images/swamp_2-10.png' },
      { zone: 11, span: 2, contentType: 'image', filepath: 'media/images/tundra_2-10.png' }
    ]
  })


  // Scene - Same as above, but with 5 zones by using the 10-zone grid
  // This example specifies the grid (grid: 10) before the layout
  // The layout is similar to the one above but with only 5 zones
  conf.addScene({
    grid: 10,
    layout: [
      { zone: 1, span: 2, contentType: 'image', filepath: 'media/images/beach_2-10.png' },
      { zone: 3, span: 2, contentType: 'image', filepath: 'media/images/desert_2-10.png' },
      { zone: 5, span: 2, contentType: 'image', filepath: 'media/images/forest_2-10.png' },
      { zone: 7, span: 2, contentType: 'image', filepath: 'media/images/swamp_2-10.png' },
      { zone: 9, span: 2, contentType: 'image', filepath: 'media/images/tundra_2-10.png' }
    ]
  })


  // Scene - alternating long and short zones, with video and images
  conf.addScene({
    layout: [
      { zone: 1, span: 2, contentType: 'video', filepath: 'media/video/anemone_wide.mp4'  },
      { zone: 3, contentType: 'image', filepath: 'media/images/anemone1.png' },
      { zone: 4, span: 2, contentType: 'video', filepath: 'media/video/anemone_wide.mp4' },
      { zone: 6, contentType: 'image', filepath: 'media/images/anemone2.png' },
      { zone: 7, span: 2, contentType: 'video', filepath: 'media/video/anemone_wide.mp4' },
      { zone: 9, contentType: 'image', filepath: 'media/images/anemone3.png' },
      { zone: 10, span: 2, contentType: 'video', filepath: 'media/video/anemone_wide.mp4' },
      { zone: 12, contentType: 'image', filepath: 'media/images/anemone4.png' }
    ]
  })


  // Scene - This is an example of using D3 (or other Javascript visualizations)
  // It includes 3 different D3 graphs
  // This is more complicated and has specific requirements for how Javascript should be structured
  // Note that this layout doesn't use all the available zones, so there are blank areas in the display
  conf.addScene({
    layout: [
      { zone: 3, span: 2, contentType: 'html', content: '<div id="my-scatterplot"></div>', backgroundColor: '#fff', callback: scatterplot  },
      { zone: 6, span: 2, contentType: 'html',
        content: '<div class="input-wrapper"><input type="range" name="mySlider" id=mySlider min="10" max="100" value="50"></div><div id="my-density-plot"></div>',
        backgroundColor: '#fff', callback: densityPlotSlider  },
      { zone: 9, span: 2, contentType: 'html', content: '<div id="my-ridgeline"></div>', backgroundColor: '#fff', callback: ridgeline  }
    ]
  })


  // *** No edits below here ***
  return conf;
}
