"use client"
import { createContext, useContext, useEffect, useState } from "react"

type ParticipantCountContextType = {
  count: number | null
  increment: () => void
}

const ParticipantCountContext = createContext<ParticipantCountContextType>({
  count: null,
  increment: () => {},
})

export const useParticipantCount = () => useContext(ParticipantCountContext)

export function ParticipantCountProvider({ children }: { children: React.ReactNode }) {
  const [count, setCount] = useState<number | null>(null)

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const res = await fetch("/api/participants/count")
        const data = await res.json()
        if (res.ok) setCount(data.count)
      } catch (error) {
        console.error("Erreur de récupération du compteur :", error)
      }
    }
    fetchCount()
  }, [])

  const increment = () => {
    setCount(prev => (prev !== null ? prev + 1 : 1))
  }

  return (
    <ParticipantCountContext.Provider value={{ count, increment }}>
      {children}
    </ParticipantCountContext.Provider>
  )
}
