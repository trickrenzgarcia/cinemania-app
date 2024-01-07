import MovieReservation from '@/components/MovieReservation'
import React from 'react'

export default function TicketPage({ params: { id }} : { params: { id: number}}) {
  return (
    <main>
      <div className="mt-28">
      <MovieReservation id={id} />
      </div>
      
    </main>
  )
}
