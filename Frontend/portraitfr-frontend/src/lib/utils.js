// lib/utils.ts
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

// Vos fonctions existantes
export const preloadImages = (selector = 'img') => {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') {
      return resolve()
    }

    import('imagesloaded').then(({ default: imagesLoaded }) => {
      const elements = document.querySelectorAll(selector)
      
      if (elements.length === 0) {
        console.warn(`No elements found with selector: ${selector}`)
        return resolve()
      }

      imagesLoaded(elements, { background: true }, resolve)
    }).catch(err => {
      console.error('Failed to load imagesLoaded:', err)
      resolve()
    })
  })
}

export const preloadSpecificImages = (imagePaths) => {
  return Promise.all(
    imagePaths.map(path => {
      return new Promise((resolve) => {
        const img = new Image()
        img.src = path
        img.onload = resolve
        img.onerror = resolve
      })
    })
  )
}