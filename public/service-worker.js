const FILE_TO_CACHE = [
    "/",
    "/index.html",
    "/js/index.js",
    "/js/idb.js",
    "/css/style.css",
    "/manifest.json"
];

const APP_PREFIX = 'budget-tracker-';
const VERSION = '0.1'
const CACHE_NAME = APP_PREFIX + VERSION;

self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('installing cache: ' + CACHE_NAME);
            return cache.addAll(FILE_TO_CACHE)
        })
    )
});

self.addEventListener('activate', function(evt) {
    evt.waitUntil(
        caches.keys().then(keyList => {
            let cacheKeepList = keyList.filter(key => {
                return key.indexOf(APP_PREFIX);
            });
            cacheKeepList.push(CACHE_NAME);

            return Promise.all(keyList.map(function (key, i) {
                if(cacheKeepList.indexOf(key) === -1) {
                    console.log('deleting cache: ' + keyList[i])
                }
            }))
        })
    )
});

self.addEventListener('fetch', evt => {
    evt.respondWith(
        caches.match(evt.request).then(request => {
            if (request) {
                console.log('responding with cache: ' + evt.request.url);
                return fetch(evt.request)
            }
        })
    )
});