// components/ParticipantCount.tsx
"use client"
import { useParticipantCount } from "@/context/ParticipantCountContext"

export default function ParticipantCount() {
  const { count } = useParticipantCount()

  if (count === null) return null

  return (
    <p className="text-center mt-6 text-sm text-gray-400">
      🎉 {count} participant{count > 1 ? "s" : ""} déjà inscrit{count > 1 ? "s" : ""}
    </p>
  )
}
