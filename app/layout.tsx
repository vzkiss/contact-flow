import localFont from 'next/font/local'
import type { Metadata, Viewport } from 'next'
import { Providers } from '@/providers'
import { Toaster } from 'sonner'
import { Analytics } from '@vercel/analytics/next'

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

export const metadata: Metadata = {
  title: 'Contact Flow | vzkiss.com',
  icons: {
    icon: [
      { url: '/favicon/favicon.ico', type: 'image/x-icon' },
      {
        url: '/favicon/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
      {
        url: '/favicon/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
    ],
    apple: '/favicon/apple-touch-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
}

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
        <Toaster position="bottom-center" />
        <Analytics />
      </body>
    </html>
  )
}
