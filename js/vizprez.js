// VizPrezConfig handles configuration for VizPrez

function VizPrezConfig() {
  this.scenes = [];
  this.transitionInterval = null;
  // We can add more config attributes later
}

VizPrezConfig.prototype.addScene = function(sceneConfig) {
  if (sceneConfig.layouts) {
    sceneConfig.layouts.sort(function(a,b) { return a.zone - b.zone });
  }
  this.scenes.push(sceneConfig);
}


// VizPrez is the presentation proper

function VizPrez(selector, config) {
  this.root = document.querySelector(selector);

  if (!this.root) {
    console.log("Root element '" + selector + "' element does not exist!");
  }
  else if (!config) {
    console.log('config is required!');
  }
  else if (!config.scenes) {
    console.log("config must include at least one scene in config['scenes']!");
  }
  else {
    // // Enable for auto run mode
    // this.interval = options['interval'] || 400;
    
    // // Enable for audio!
    // this.audio;
  
    this.config = config;
    this.scenes = config.scenes;

    console.log(this.scenes);

    this.transitionInterval = config.transitionInterval || 1000;
    this.initialize();
    this.enableKeyboardConrol();
  }

  return this;
}

VizPrez.prototype.initialize = function() {
  this.started = false;
  this.sceneIndex = 0;
  this.zoneWrappers = this.root.querySelectorAll('.zone-wrapper');
  this.zoneWrapperTopIndex = 0;
  this.zoneWrapperNextIndex = 1;
  this.zoneWrapperTop = this.zoneWrappers[this.zoneWrapperTopIndex];
  this.zoneWrapperNext = this.zoneWrappers[this.zoneWrapperNextIndex];
  this.zoneWrapperTop.style.zIndex = 1;
  this.zoneWrapperNext.style.zIndex = 0;
  this.grids = [12,10,8];
  this.transitioning = false;
  var _this = this;
  var scene1 = this.scenes[this.sceneIndex];
  this.initializeLayout(this.zoneWrapperTop, scene1);
  this.loadContent(this.zoneWrapperTop, scene1);
  this.incrementSceneIndex();
  var scene2 = this.scenes[this.sceneIndex];
  this.initializeLayout(this.zoneWrapperNext, scene2);
  this.loadContent(this.zoneWrapperNext, scene2);
  this.incrementSceneIndex();
}


VizPrez.prototype.initializeLayout = function(zoneWrapper, scene) {
  var layout = scene.layout;
  layout = layout.sort(function(a,b) { return a.zone - b.zone });
  removeAllChildNodes(zoneWrapper);
  
  // Reset zone wrapper classes
  for (var i = 0; i < this.grids.length; i++) {
    let classname = 'grid-' + this.grids[i];
    zoneWrapper.classList.remove(classname);
  }

  if (scene.grid && this.grids.indexOf(scene.grid) >= 0) {
    zoneWrapper.classList.add('grid-' + scene.grid);
  }

  for (i = 0; i < layout.length; i++) {
    let zoneConf = layout[i];
    let zoneId = "zone-" + zoneConf.zone;
    let zoneClasses = ['zone', zoneId];
    if (zoneConf.span) {
      zoneClasses.push("span-" + zoneConf.span);
    }
    let zone = generateElement('div', zoneClasses);
    // zone.id = zoneId;
    let wrapper = generateElement('div', 'wrapper');
    zone.appendChild(wrapper);
    zoneWrapper.appendChild(zone);
  }
}


VizPrez.prototype.loadContent = function(zoneWrapper, scene) {
  console.log(scene);

  var layout = scene.layout;
  layout = layout.sort(function(a,b) { return a.zone - b.zone });
  var imgHtml = '<img src="">';
  var videoHtml = '<video loop="loop" muted="muted" src="" class="paused"></video>';
  var divHtml = '<div class="zone-content-html"></div>';

  for (var i = 0; i < layout.length; i++) {
    var zoneConf = layout[i]
    var zoneId = "zone-" + zoneConf.zone;
    var zoneSelector = '.zone.' + zoneId;
    // console.log(zoneSelector);
    var zone = zoneWrapper.querySelector(zoneSelector);

    if (zone) {
      var wrapper = zone.querySelector('.wrapper');
      var el;
      switch (zoneConf.contentType) {
      case 'video':
        el = htmlToElement(videoHtml);
        el.src = zoneConf.filepath;
        break;
      case 'image':
        el = htmlToElement(imgHtml);
        el.src = zoneConf.filepath;
        break;
      case 'html':
        el = htmlToElement(divHtml);

        console.log(zoneConf);
        zoneConf
        if (zoneConf.content) {
          el.innerHTML = zoneConf.content;
        }
        break;
      }

      if (el) {
        wrapper.appendChild(el);
      }

      if (zoneConf.backgroundColor) {
        wrapper.style.backgroundColor = zoneConf.backgroundColor;
      }

      if (zoneConf.callback) {
        executeCallback(zoneConf.callback);
      }
    }
  }

  console.log(scene.callback);


}


VizPrez.prototype.incrementSceneIndex = function() {
  // this.sceneIndex = increment(this.sceneIndex, this.scenes.length - 1);
  this.sceneIndex = (this.sceneIndex + 1) % this.scenes.length;
}


VizPrez.prototype.loadNext = function() {
  var scene = this.scenes[this.sceneIndex];
  this.initializeLayout(this.zoneWrapperNext, scene);
  this.loadContent(this.zoneWrapperNext, scene);
  this.incrementSceneIndex();
}


VizPrez.prototype.loadPrev = function() {
  // At this point the next scene has already been loaded, and this.sceneIndex has been incremented to the one after
  // That means that this.sceneIndex is 2 past the current scene's index
  // So to load the previous one, you need to set that number back by 3
  var indexMinus2 = this.sceneIndex - 3;
  this.sceneIndex = (indexMinus2 >= 0) ? indexMinus2 : ((this.scenes.length - 1) + indexMinus2);
  console.log("loadPrev " + this.sceneIndex);
  var scene = this.scenes[this.sceneIndex];
  this.initializeLayout(this.zoneWrapperNext, scene);
  this.loadContent(this.zoneWrapperNext, scene);
  this.incrementSceneIndex();
}


VizPrez.prototype.loadVideo = function(wrapper, src) {
  var player = wrapper.querySelector('video');
  player.src = src;
}


VizPrez.prototype.loadImage = function(wrapper, src) {
  console.log(wrapper);

  var img = wrapper.querySelector('img');
  img.src = src;
}


VizPrez.prototype.advance = function() {
  console.log('advance');
  this.transitioning = true;
  var _this = this;
  // this.loadContent(this.zoneWrapperNext);
  this.zoneWrapperNext.style.opacity = 0;
  this.zoneWrapperNext.style.zIndex = 1000;
  this.zoneWrapperTop.style.zIndex = 0;
  this.restartChildVideoPlayers(this.zoneWrapperNext);

  fadeIn(this.zoneWrapperNext, this.transitionInterval, function() {
    var newNext = _this.zoneWrapperTop;
    var newTop = _this.zoneWrapperNext;
    _this.zoneWrapperTop = newTop;
    _this.zoneWrapperNext = newNext;
    _this.loadNext();
    _this.transitioning = false;
  });
}


VizPrez.prototype.reverse = function() {
  console.log('reverse');
  this.loadPrev();
  this.advance();
}


VizPrez.prototype.playPause = function(element) {
  var players;
  if (element) {
    players = element.querySelectorAll('video,audio');
  }
  else {
    players = document.querySelectorAll('video,audio');
  }
  players.forEach(function(player) {
    console.log(player);
    playPause(player);
  });
}


VizPrez.prototype.start = function() {
  var _this = this;
  // this.loadNext();
  this.restartChildVideoPlayers(this.zoneWrapperTop);
  this.transitioning = true;

  fadeIn(this.zoneWrapperTop, this.transitionInterval, function() {
    _this.zoneWrapperTop.classList.remove('to-fade-in');
    _this.transitioning = false;
  });
  this.started = true;
}


VizPrez.prototype.restartChildVideoPlayers = function(element) {
  var players = element.querySelectorAll('video');
  players.forEach(function(player) { pause(player); });
  players.forEach(function(player) { player.currentTime = 0; });
  players.forEach(function(player) { play(player); });
}


VizPrez.prototype.enableKeyboardConrol = function() {
  var _this = this;
  document.addEventListener('keydown', function(event) {
    var keyCode = event.keyCode;
    // s for start
    if (!_this.started) {
      _this.start();
    }
    else if (_this.started) {
      switch(keyCode) {
        // spacebar
        case 32:
          _this.playPause();
          break;
        // n
        case 78:
          if (!_this.transitioning) {
            _this.advance();
          }
        // b
        case 66:
          if (!_this.transitioning) {
            _this.reverse();
          }
          break;
        // p
        case 80:
          break;
        // arrow right
        case 39:
          break;
        // arrow left
        case 37:
          break;
      }
    }
    
  });
}
