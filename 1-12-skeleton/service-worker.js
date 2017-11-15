var dataCacheName = 'weatherData-v1';
var cacheName = 'weatherPWA-v1';
var filesToCache = [
  '/',
  '/index.html',
  '/styles/ud811.css',
  '/scripts/app.js',
  '/scripts/localforage.js',
  '/images/clear.png',
  '/images/cloudy-scattered-showers.png',
  '/images/cloudy.png',
  '/images/cloudy_s_sunny.png',
  '/images/fog.png',
  '/images/ic_add_white_24px.svg',
  '/images/ic_refresh_white_24px.svg',
  '/images/partly-cloudy.png',
  '/images/rain.png',
  '/images/scattered-showers.png',
  '/images/sleet.png',
  '/images/snow.png',
  '/images/thunderstorm.png',
  '/images/wind.png'
];

var weatherAPIUrlBase = 'https://publicdata-weather.firebaseio.com/';

this.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(filesToCache);
    })
  );
});

this.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName && key !== dataCacheName) {
          return caches.delete(key);
        }
      }));
    })
  );
});

this.addEventListener('fetch', function(event) {
  if (event.request.url.startsWith(weatherAPIUrlBase)) {
    event.respondWith(
      fetch(event.request).then(function(response) {
        return caches.open(dataCacheName).then(function(cache) {
          cache.put(event.request.url, response.clone());
          return response;
        });
      })
    )
  } else {
    event.respondWith(
      caches.match(event.request).then(function(response) {
        return response || fetch(event.request);
      })
    );
  }
});
