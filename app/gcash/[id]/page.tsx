import React from 'react'

type Props = {
  params: {
    id: string;
  }
  searchParams: {
    day: string;
    date: string;
    time: string;
    seats: string;
    email: string;
    total: string;
  }
}

export default function GCashPayment({ params: {id}, searchParams: {day, date, time, seats, email, total}}: Props) {
  console.log(email)

  return (
    <div>GCashPayment</div>
  )
}
