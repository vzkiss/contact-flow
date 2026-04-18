import localFont from 'next/font/local'
import type { Metadata } from 'next'
import { Providers } from '@/providers'

import './globals.css'
import { cn } from '@/lib/utils'

const glysa = localFont({
  src: './fonts/Glysa.otf',
  variable: '--font-stack-heading',
  display: 'swap',
  weight: '500',
})

const lexendDeca = localFont({
  src: './fonts/LexendDeca-VariableFont_wght.ttf',
  variable: '--font-stack-body',
  display: 'swap',
  weight: '400',
})

export const metadata: Metadata = { title: 'Contact Flow', colorScheme: 'dark' }

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn('antialiased', lexendDeca.variable, glysa.variable, 'dark')}
    >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
