import '../styles/globals.css' // or your global stylesheet
import type { AppProps } from 'next/app'
import { Header } from '../components/organisms/Header/Header'
import { Footer } from '../components/organisms/Footer/Footer'
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`flex min-h-screen flex-col ${inter.className}`}>
      <Header />
      <main className="flex-grow">
        <Component {...pageProps} />
      </main>
      <Footer />
    </div>
  )
}

export default App