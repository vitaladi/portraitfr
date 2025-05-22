// lib/utils.js
export const preloadImages = (selector = 'img') => {
    return new Promise((resolve) => {
      // Utilisez la version ES modules si possible
      import('./imagesloaded.pkgd.min.js').then(({default: imagesLoaded}) => {
        imagesLoaded(document.querySelectorAll(selector), {background: true}, resolve);
      });
    });
  };