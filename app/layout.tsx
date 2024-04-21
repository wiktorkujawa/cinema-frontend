import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import { Header } from '@/components/organisms/Header/Header'
import { Footer } from '@/components/organisms/Footer/Footer'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={`flex min-h-screen flex-col ${inter.className}`}>
                <Header />
                <main className="flex-grow flex flex-col items-center justify-center">
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    )
}
