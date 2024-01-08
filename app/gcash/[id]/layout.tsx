import '@/app/globals.css'
import type { Metadata } from 'next'


export const metadata: Metadata = {
  title: 'Cinema GCash API Integrated',
  description: 'A Cinema Ticket & Seat Reservation',
  keywords: ['Next.js', 'Movie Reservation', 'Ticket & Seat Reservation'],
  icons: {
    icon: '/favicon.ico',
    shortcut: '/icon-256x256.png',
    apple: '/icon-256x256.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='bg-white dark:bg-[#1A1C29]'>
        {children}
      </body>
    </html>
  )
}