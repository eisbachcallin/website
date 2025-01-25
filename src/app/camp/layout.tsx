import Footer from '@/components/navigation/Footer'
import Header from '@/components/navigation/Header'
import clsx from 'clsx'
import { Share_Tech_Mono as Mono, Inter as Sans } from 'next/font/google'
import '../globals.css'
import { Providers } from '../../app/providers'
import { Metadata } from 'next'

const sans = Sans({
  subsets: ['latin'],
  variable: '--font-sans',
})

const mono = Mono({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: 'Eisbach Callin Camp',
  description: 'Underground Rave since 2010',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
