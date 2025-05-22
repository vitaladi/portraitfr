// app/animations.ts
export const preloadImages = (selector = '.card__img') => {
    return new Promise<void>((resolve) => {
      imagesLoaded(selector, { background: true }, () => resolve())
    })
  }
  
  // Fonction pour initialiser les animations
  export const initAnimations = () => {
    // Nous utilisons GSAP directement dans le composant
  }