import { Inter } from 'next/font/google'
import './globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Free Energy Upgrades - UK Government Funding',
  description: 'Get FREE energy upgrades fully backed by UK Government funding. Thousands of UK households have already received upgrades.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}