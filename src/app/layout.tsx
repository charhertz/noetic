import './globals.css'
import { Providers } from './providers'

export const metadata = {
  title: 'Next.js 13 Notion Blog',
  description: 'An Open-Source Blog Powered by Next.js 13 and Notion',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
