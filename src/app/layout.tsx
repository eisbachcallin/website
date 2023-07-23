import './globals.css'
import { Inter as Sans, JetBrains_Mono as Mono } from 'next/font/google'
import clsx from 'clsx'
import Header from './components/navigation/Header'

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
    default: 'Eisbach Callin',
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
        'scroll-smooth font-mono selection:bg-pink-500 selection:text-white dark:selection:text-black'
      )}
    >
      <body className='relative bg-white dark:bg-gray-950'>
        <Header />
        {children}
      </body>
    </html>
  )
}
