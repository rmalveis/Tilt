/*
 * TiltChromeGUI.js - UI implementation for the visualization
 * version 0.1
 *
 * Copyright (c) 2011 Victor Porof
 *
 * This software is provided 'as-is', without any express or implied
 * warranty. In no event will the authors be held liable for any damages
 * arising from the use of this software.
 *
 * Permission is granted to anyone to use this software for any purpose,
 * including commercial applications, and to alter it and redistribute it
 * freely, subject to the following restrictions:
 *
 *    1. The origin of this software must not be misrepresented; you must not
 *    claim that you wrote the original software. If you use this software
 *    in a product, an acknowledgment in the product documentation would be
 *    appreciated but is not required.
 *
 *    2. Altered source versions must be plainly marked as such, and must not
 *    be misrepresented as being the original software.
 *
 *    3. This notice may not be removed or altered from any source
 *    distribution.
 */
"use strict";

var TiltChrome = TiltChrome || {};
var EXPORTED_SYMBOLS = ["TiltChrome.UI"];

/**
 * UI implementation.
 */
TiltChrome.UI = function() {

  /**
   * Handler for all the GUI elements.
   */
  var gui = null,

  /**
   * The texture containing all the GUI elements.
   */
  texture = null,

  /**
   * The background gradient.
   */
  background = null,

  /**
   * The controls information.
   */
  helpPopup = null,

  /**
   * The top-right menu buttons.
   */
  optionsButton = null,
  exportButton = null,
  helpButton = null,
  exitButton = null,

  /**
   * Top-left control items.
   */
  arcballSprite = null,
  eyeButton = null,
  resetButton = null,
  zoomInButton = null,
  zoomOutButton = null,

  /**
   * Middle-left control items.
   */
  viewModeNormalButton = null,
  viewModeWireframeButton = null,
  colorAdjustButton = null,
  colorAdjustPopup = null;

  /**
   * Function called automatically by the visualization at the setup().
   * @param {HTMLCanvasElement} canvas: the canvas element
   */
  this.init = function(canvas) {
    gui = new Tilt.GUI();

    texture = new Tilt.Texture("chrome://tilt/skin/tilt-gui.png", {
      minFilter: "nearest",
      magFilter: "nearest"
    });

    background = new Tilt.Sprite(texture, [0, 1024 - 256, 256, 256], {
      width: canvas.width,
      height: canvas.height,
      depthTest: true
    });

    var helpPopupSprite = new Tilt.Sprite(texture, [210, 180, 610, 510]);
    helpPopup = new Tilt.Container(helpPopupSprite, {
      background: "#0107",
      hidden: true
    });

    optionsButton = new Tilt.Button(canvas.width - 320, 0,
      new Tilt.Sprite(texture, [942, 0, 77, 38]));

    exportButton = new Tilt.Button(canvas.width - 240, 0,
      new Tilt.Sprite(texture, [942, 40, 70, 38]));

    helpButton = new Tilt.Button(canvas.width - 160, 0,
      new Tilt.Sprite(texture, [942, 80, 55, 38]));

    exitButton = new Tilt.Button(canvas.width - 50, 0,
      new Tilt.Sprite(texture, [942, 120, 50, 38]));

    arcballSprite = new Tilt.Sprite(texture, [0, 0, 145, 145], {
      x: 10,
      y: 10
    });

    eyeButton = new Tilt.Button(0, 0,
      new Tilt.Sprite(texture, [0, 147, 42, 42]));

    resetButton = new Tilt.Button(60, 150,
      new Tilt.Sprite(texture, [0, 190, 42, 42]));

    zoomInButton = new Tilt.Button(100, 150,
      new Tilt.Sprite(texture, [0, 234, 42, 42]));

    zoomOutButton = new Tilt.Button(20, 150,
      new Tilt.Sprite(texture, [0, 278, 42, 42]));

    viewModeNormalButton = new Tilt.Button(50, 200,
      new Tilt.Sprite(texture, [438, 0, 66, 66]));

    viewModeWireframeButton = new Tilt.Button(50, 200,
      new Tilt.Sprite(texture, [438, 67, 66, 66]));

    colorAdjustButton = new Tilt.Button(50, 260,
      new Tilt.Sprite(texture, [505, 0, 66, 66]));

    var colorAdjustPopupSprite = new Tilt.Sprite(texture, [572, 0, 231, 93], {
      x: 88,
      y: 258
    });
    colorAdjustPopup = new Tilt.Container([colorAdjustPopupSprite], {
      hidden: false
    });

    texture.onload = function() {
      this.visualization.redraw();
    }.bind(this);

    eyeButton.onclick = function(x, y) {
      if (gui.elements.length !== 3) {
        gui.remove(
          helpPopup, colorAdjustPopup,
          arcballSprite, resetButton, zoomInButton, zoomOutButton,
          viewModeNormalButton, colorAdjustButton,
          optionsButton, exportButton, helpButton);
      }
      else {
        gui.push(
          helpPopup, colorAdjustPopup,
          arcballSprite, resetButton, zoomInButton, zoomOutButton,
          viewModeNormalButton, colorAdjustButton,
          optionsButton, exportButton, helpButton);
      }
    }.bind(this);

    resetButton.onclick = function(x, y) {
      handleReset();
    }.bind(this);

    zoomInButton.onclick = function(x, y) {
      handleZoom(200);
    }.bind(this);

    zoomOutButton.onclick = function(x, y) {
      handleZoom(-200);
    }.bind(this);

    var handleReset = function() {
      // var id = window.setInterval(function() {
      //   if (Math.abs(vec3.length(this.controller.translation)) < 0.1 && 
      //       Math.abs(vec3.length(this.controller.rotation)) < 0.1) {
      //     window.clearInterval(id);
      //   }
      //   else {
      //     vec3.scale(this.controller.translation, 0.8);
      //     vec3.scale(this.controller.rotation, 0.8);
      //   }
      // }.bind(this), 1000 / 60);
    }.bind(this);

    var handleZoom = function(value) {
      // if ("undefined" === typeof this.zoomAmmount) {
      //   this.zoomAmmount = value;
      // }
      // else {
      //   this.zoomAmmount += value;
      // }
      // 
      // var id = window.setInterval(function() {
      //   var prev = this.controller.translation[2];
      //   var dist = (this.zoomAmmount - prev) / 20;
      // 
      //   if (Math.abs(dist) < 0.01) {
      //     window.clearInterval(id);
      //   }
      //   else {
      //     this.controller.translation[2] += dist;
      //   }
      // }.bind(this), 1000 / 60);
    }.bind(this);

    helpButton.onclick = function(x, y) {
      var helpX = canvas.width / 2 - 305,
        helpY = canvas.height / 2 - 305,
        exitX = canvas.width / 2 + 197,
        exitY = canvas.height / 2 - 218;

      helpPopup.elements[0].x = helpX;
      helpPopup.elements[0].y = helpY;
      helpPopup.elements[1] = 
        new Tilt.Button(exitX, exitY, { width: 32, height: 32 }, function() {
          helpPopup.elements[1].destroy();
          helpPopup.elements.pop();
          helpPopup.hidden = true;
        });

      helpPopup.hidden = false;
    }.bind(this);

    exitButton.onclick = function(x, y) {
      TiltChrome.BrowserOverlay.destroy(true, true);
      TiltChrome.BrowserOverlay.href = null;
    }.bind(this);

    gui.push(
      background,
      helpPopup, // colorAdjustPopup,
      /* arcballSprite, resetButton, zoomInButton, zoomOutButton,
      viewModeNormalButton, colorAdjustButton,
      eyeButton, optionsButton, exportButton, */ helpButton, exitButton);
  };

  /**
   * Called automatically by the visualization after each frame in draw().
   * @param {Number} frameDelta: the delta time elapsed between frames
   */
  this.draw = function(frameDelta) {
    gui.draw();
  };

  /**
   * Delegate click method, handled by the controller.
   *
   * @param {Number} x: the current horizontal coordinate
   * @param {Number} y: the current vertical coordinate
   */
  this.click = function(x, y) {
    gui.click(x, y);
  };

  /**
   * Delegate double click method, handled by the controller.
   *
   * @param {Number} x: the current horizontal coordinate
   * @param {Number} y: the current vertical coordinate
   */
  this.doubleClick = function(x, y) {
    gui.doubleClick(x, y);
  };

  /**
   * Delegate method, called when the user interface needs to be resized.
   *
   * @param width: the new width of the visualization
   * @param height: the new height of the visualization
   */
  this.resize = function(width, height) {
    background.width = width;
    background.height = height;

    optionsButton.x = width - 320;
    exportButton.x = width - 240;
    helpButton.x = width - 160;
    exitButton.x = width - 50;
  };

  /**
   * Destroys this object and sets all members to null.
   */
  this.destroy = function(canvas) {
    try {
      gui.destroy();
      gui = null;
    }
    catch(e) {}

    for (var i in this) {
      try {
        if ("function" === typeof this[i].destroy) {
          this[i].destroy();
        }
      }
      catch(e) {}
      finally {
        delete this[i];
      }
    }
  };
};
