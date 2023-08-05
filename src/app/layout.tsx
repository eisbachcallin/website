import './globals.css'
import { Nunito_Sans as Sans, JetBrains_Mono as Mono } from 'next/font/google'
import clsx from 'clsx'
import Header from '@/components/navigation/Header'
import Footer from '@/components/navigation/Footer'

const sans = Sans({
  subsets: ['latin'],
  variable: '--font-sans',
})

const mono = Mono({
  subsets: ['latin'],
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
        'scroll-smooth selection:bg-accent selection:text-onaccent',
        'theme-dark'
      )}
    >
      <body className='relative bg-default font-mono'>
        <Header />
        <main className='flex min-h-[calc(100vh-6rem)]'>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
