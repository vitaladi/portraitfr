'use client'

import { createContext, ReactNode, useCallback, useContext, useEffect, useRef } from 'react'
import { useAnimationFrame, motion } from 'framer-motion'
import Image from 'next/image'
import { cn } from '@/lib/utils'

const FloatingContext = createContext<{
  registerElement: (id: string, element: HTMLDivElement, depth: number) => void
  unregisterElement: (id: string) => void
} | null>(null)

function useMousePositionRef(containerRef: React.RefObject<HTMLElement | null>) {
  const positionRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const updatePosition = (x: number, y: number) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        positionRef.current = {
          x: x - rect.left,
          y: y - rect.top
        }
      } else {
        positionRef.current = { x, y }
      }
    }

    const handleMouseMove = (e: MouseEvent) => updatePosition(e.clientX, e.clientY)
    const handleTouchMove = (e: TouchEvent) => updatePosition(e.touches[0].clientX, e.touches[0].clientY)

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('touchmove', handleTouchMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchmove', handleTouchMove)
    }
  }, [containerRef])

  return positionRef
}

export function FloatingImagesContainer({ 
  children, 
  className = '', 
  sensitivity = 1, 
  easingFactor = 0.05 
}: {
  children: ReactNode
  className?: string
  sensitivity?: number
  easingFactor?: number
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const elementsMap = useRef(new Map<string, {
    element: HTMLDivElement
    depth: number
    currentPosition: { x: number; y: number }
  }>())
  const mousePositionRef = useMousePositionRef(containerRef)

  const registerElement = useCallback((id: string, element: HTMLDivElement, depth: number) => {
    elementsMap.current.set(id, { element, depth, currentPosition: { x: 0, y: 0 } })
  }, [])

  const unregisterElement = useCallback((id: string) => {
    elementsMap.current.delete(id)
  }, [])

  useAnimationFrame(() => {
    if (!containerRef.current) return

    elementsMap.current.forEach(data => {
      const strength = (data.depth * sensitivity) / 20
      const newTargetX = mousePositionRef.current.x * strength
      const newTargetY = mousePositionRef.current.y * strength
      const dx = newTargetX - data.currentPosition.x
      const dy = newTargetY - data.currentPosition.y

      data.currentPosition.x += dx * easingFactor
      data.currentPosition.y += dy * easingFactor

      data.element.style.transform = `translate3d(${data.currentPosition.x}px, ${data.currentPosition.y}px, 0)`
    })
  })

  return (
    <FloatingContext.Provider value={{ registerElement, unregisterElement }}>
      <div ref={containerRef} className={cn('absolute inset-0 w-full h-full', className)}>
        {children}
      </div>
    </FloatingContext.Provider>
  )
}

export function FloatingImage({ 
  src, 
  size = 'medium', 
  depth = 1, 
  top, 
  left,
  className = '',
  width = 400,
  height = 400,
  alt = ''
}: {
  src: string
  size?: 'small' | 'medium' | 'large' | 'xlarge'
  depth?: number
  top?: string
  left?: string
  className?: string
  width?: number
  height?: number
  alt?: string
}) {
  const sizeClasses = {
    small: 'w-16 h-16 md:w-24 md:h-24',
    medium: 'w-20 h-20 md:w-28 md:h-28',
    large: 'w-28 h-40 md:w-40 md:h-52',
    xlarge: 'w-40 md:w-52 h-full'
  }

  return (
    <FloatingImageElement depth={depth} top={top} left={left}>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={cn(
          `${sizeClasses[size]} object-cover hover:scale-105 duration-200 transition-transform rounded-lg shadow-lg`,
          className
        )}
      >
        <Image
          src={src}
          width={width}
          height={height}
          className="w-full h-full object-cover"
          alt={alt}
        />
      </motion.div>
    </FloatingImageElement>
  )
}

function FloatingImageElement({ 
  children, 
  className = '', 
  depth = 1, 
  top, 
  left 
}: {
  children: React.ReactNode
  className?: string
  depth?: number
  top?: string
  left?: string
}) {
  const elementRef = useRef<HTMLDivElement>(null)
  const idRef = useRef(Math.random().toString(36).substring(7))
  const context = useContext(FloatingContext)

  useEffect(() => {
    if (!elementRef.current || !context) return
    context.registerElement(idRef.current, elementRef.current, depth)
    return () => context.unregisterElement(idRef.current)
  }, [depth, context])

  return (
    <div 
      ref={elementRef} 
      className={cn('absolute will-change-transform', className)}
      style={{ top, left }}
    >
      {children}
    </div>
  )
}