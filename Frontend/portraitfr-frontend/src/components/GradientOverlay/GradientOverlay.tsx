'use client'

import { cn } from '@/lib/utils'

export function GradientOverlay({
  className = '',
  fromColor = 'from-orange-500/30',
  toColor = 'to-transparent',
  direction = 'bg-gradient-to-b'
}: {
  className?: string
  fromColor?: string
  toColor?: string
  direction?: string
}) {
  return (
    <div 
      className={cn(
        'absolute inset-0 z-1',
        direction,
        fromColor,
        toColor,
        className
      )}
    />
  )
}