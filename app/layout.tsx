import type { Metadata } from 'next'
import './globals.css'
import '../public/styles.css'


export const metadata: Metadata = {
  title: 'To-Do List',
  description: 'App for girl to make stuff for her day',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="">{children}</body>
    </html>
  )
}
