// Generated by CoffeeScript 1.9.0
(function() {
  var browserify, fs, isArray,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __hasProp = {}.hasOwnProperty;

  browserify = require('browserify');

  fs = require('fs');

  isArray = Array.isArray || function(value) {
    return {}.toString.call(value) === '[object Array]';
  };

  module.exports = function(BasePlugin) {
    var BrowserifybundlerPlugin;
    return BrowserifybundlerPlugin = (function(_super) {
      __extends(BrowserifybundlerPlugin, _super);

      function BrowserifybundlerPlugin() {
        return BrowserifybundlerPlugin.__super__.constructor.apply(this, arguments);
      }

      BrowserifybundlerPlugin.prototype.name = 'browserifybundler';

      BrowserifybundlerPlugin.prototype.config = {
        outFile: '/scripts/app.js',
        inFiles: null,
        excludes: ['jquery']
      };

      BrowserifybundlerPlugin.prototype.writeAfter = function() {
        var b, destination, docpad, ignore, inFile, inputCount, outPath, rootPath, _i, _j, _len, _len1, _ref, _ref1, _ref2;
        docpad = this.docpad;
        _ref = docpad.getConfig(), rootPath = _ref.rootPath, outPath = _ref.outPath;
        if (!isArray(this.config.inFiles)) {
          this.config.inFiles = [this.config.inFiles];
        }
        if (!isArray(this.config.excludes)) {
          this.config.excludes = [this.config.excludes];
        }
        b = browserify();
        _ref1 = this.config.inFiles;
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          inFile = _ref1[_i];
          b.add("" + outPath + inFile);
        }
        _ref2 = this.config.excludes;
        for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
          ignore = _ref2[_j];
          b.ignore("" + ignore);
        }
        destination = fs.createWriteStream("" + outPath + this.config.outFile);
        b.bundle().pipe(destination);
        inputCount = this.config.inFiles.length;
        return docpad.log('info', "Browserified " + inputCount + " file" + [inputCount > 1 ? 's' : void 0] + " to " + outPath + this.config.outFile);
      };

      return BrowserifybundlerPlugin;

    })(BasePlugin);
  };

}).call(this);
