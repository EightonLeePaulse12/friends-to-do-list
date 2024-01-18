import type { Metadata } from 'next'
import './globals.css'


export const metadata: Metadata = {
  title: 'Nishaan\'s To-do List',
  description: 'App for girl to make stuff for her day',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
