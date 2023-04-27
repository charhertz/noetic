import Footer from '@/components/Footer'
import Header from '@/components/Header'
import './globals.css'
import { ThemeProvider } from './providers'

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
      <body className="flex h-auto min-h-full justify-center p-6 font-sans sm:px-14 transition-colors duration-500">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex w-full max-w-[64ch] flex-col justify-between">
            <Header />
            <main className="flex w-full flex-col items-start">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
