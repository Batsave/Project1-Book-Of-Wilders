const CACHE_NAME = 'v1';
const assetsToCache = [
  '/',
  '../../index.html',
  '../../.htaccess',
  
  //CSS
  '../css/style.css',
  '../css/card.css',
  '../css/carrousel-button.css',
  '../css/dark-mode.css',
  '../css/light-mode.css',
  '../css/option.css',
  '../css/search.css',
  //JS
  '../js/allcardlist.js',
  '../js/card.js',
  '../js/carousel.js',
  '../js/option.js',
  '../js/search.js',
  '../js/theme.js',

  //SOCIAL ICONS
  '../social-icons/Facebook.svg',
  '../social-icons/GitHub.svg',
  '../social-icons/Instagram.svg',
  '../social-icons/LinkedIn.svg',
  '../social-icons/Twitter.svg',
  '../social-icons/X.svg',
  
  //DATA
  '../data/allwilders.js',
  '../data/selectedwilders.js',
  '../data/manifest.json',
  
  //SVG
  '../svg/boxtransition.svg',
  '../svg/favicon.svg',
  '../svg/left-arrow.svg',
  '../svg/logo-bookofwilders.svg',
  '../svg/right-arrow.svg',
  '../svg/searchbutton.svg',
  '../svg/searchbuttonhover.svg',
  '../svg/colormode/Dark-hover.svg',
  '../svg/colormode/Dark.svg',
  '../svg/colormode/Light-hover.svg',
  '../svg/colormode/Light.svg',

  //WEBP
  '../webp/about-picture.webp',
  '../webp/share-cover.webp',

  //PNG
  '../png/logo-192x192.png',
  '../png/logo-512x512.png',

  //PROFIL PICTURES
  '../profil-pictures/Anthony-GORSKI-min.webp',
  '../profil-pictures/Baptiste-SAVE-min.webp',
  '../profil-pictures/Baris-GUNAY-min.webp',
  '../profil-pictures/Christophe-BRUNO.webp',
  '../profil-pictures/Clément-FEMENIAS-NOIR-min.webp',
  '../profil-pictures/Diogo-CABRAL-min.webp',
  '../profil-pictures/Doriane-MULLER LEVEQUE-min.webp',
  '../profil-pictures/Elie-RAKOTO-min.webp',
  '../profil-pictures/Flavien-GAUJARD-min.webp',
  '../profil-pictures/François-CREUTZER-min.webp',
  '../profil-pictures/Ghislain-PELLICANO-min.webp',
  '../profil-pictures/Hugo-DURAND-min.webp',
  '../profil-pictures/Jérémy-ILLIEN-min.webp',
  '../profil-pictures/Jonathan-BERNARD-min.webp',
  '../profil-pictures/Jordan-MIEGER-min.webp',
  '../profil-pictures/Mehdi-MEHEMEL-min.webp',
  '../profil-pictures/Morgane-DEBARGE-min.webp',
  '../profil-pictures/none-min.webp',
  '../profil-pictures/Océane-LAHOUAL-min.webp',
  '../profil-pictures/Pierre-COLPART-min.webp',
  '../profil-pictures/Raphaël-FOULON-BINET-min.webp',
  '../profil-pictures/Samuel-FABER-min.webp',
  '../profil-pictures/Souhir-FARJALLAH-min.webp',
  '../profil-pictures/Sébastien-LACOUR-min.webp',
  '../profil-pictures/Tristan-ZVUNKA-min.webp',
];

// Installation du service worker et mise en cache des ressources initiales
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(assetsToCache);
    })
  );
});

// Gestion des requêtes
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      // Si une ressource mise en cache est trouvée, utilisez-la; sinon, récupérez-la depuis le réseau
      return cachedResponse || fetch(event.request).then(networkResponse => {
        // Si le client est connecté à Internet, mettez à jour le cache avec la nouvelle réponse
        if (navigator.onLine) {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseClone);
          });
        }
        return networkResponse;
      });
    })
  );
});

// Mise à jour du service worker
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            // Supprime les caches qui ne sont pas dans la whitelist
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
