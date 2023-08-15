import Footer from '@/components/navigation/Footer'
import Header from '@/components/navigation/Header'
import clsx from 'clsx'
import { Share_Tech_Mono as Mono, Inter as Sans } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const sans = Sans({
  subsets: ['latin'],
  variable: '--font-sans',
})

const mono = Mono({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-mono',
})

export const metadata = {
  title: {
    template: '%s | Eisbach Callin',
    default: 'All upcoming and past events | Eisbach Callin',
  },
  description: 'Underground Rave since 2010',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang='en'
      className={clsx(
        `${sans.variable} ${mono.variable}`,
        'scroll-smooth selection:bg-accent selection:text-onaccent'
      )}
      suppressHydrationWarning
    >
      <body className='relative bg-default font-mono'>
        <Providers>
          <Header />
          <main className='flex min-h-[calc(100vh-6rem)]'>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
