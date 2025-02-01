import '../globals.css'
import { Metadata } from 'next'

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
