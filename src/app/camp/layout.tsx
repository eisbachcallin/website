import '../globals.css'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Eisbach Callin Camp',
  description: 'Private, invitation-only event.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
