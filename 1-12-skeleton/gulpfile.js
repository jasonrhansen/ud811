'use strict'

var gulp = require('gulp');
var swPrecache = require('sw-precache');

gulp.task('default', ['generate-service-worker']);

gulp.task('generate-service-worker', function() {
  var swOptions = {
    staticFileGlobs: [
      './*.html',
      './images/*.{png,svg,gif,jpg}',
      './scripts/**/*.js',
      './styles/**/*.css'
    ],
    stripPrefix: '.',
    runtimeCaching: [{
      urlPattern: /^https:\/\/publicdata-weather\.firebaseio\.com/,
      handler: 'networkFirst',
      options: {
        cache: {
          name: 'weatherData'
        }
      }
    }]
  }

  return swPrecache.write('service-worker.js', swOptions);
});
