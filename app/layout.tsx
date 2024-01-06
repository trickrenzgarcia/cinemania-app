import type { Metadata } from 'next'

import './globals.css'
import Header from '@/components/Header'
import { ThemeProvider } from '@/components/ThemeProvider'

export const metadata: Metadata = {
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_APP_URL}`),
  title: 'Cinemania | Movie Ticket & Seat Reservation',
  description: 'A Cinema Reservation',
  keywords: ['Next.js', 'Movie Reservation', 'Ticket & Seat Reservation'],
  authors: [
    {
      name: 'Patrick Renz Garcia',
      url: 'https://trickrenz.vercel.app'
    }
  ],
  creator: 'Patrick Renz Garcia',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico'
  },
  manifest: `${process.env.NEXT_PUBLIC_APP_URL}/site.webmanifest`
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='bg-white dark:bg-[#1A1C29]'>
        <ThemeProvider
          attribute='class'
          defaultTheme='dark'
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
        </ThemeProvider>
        
      </body>
    </html>
  )
}
