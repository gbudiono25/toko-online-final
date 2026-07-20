import Header from './components/Header'
import Hero from './components/Hero'
import Categories from './components/Categories'
import ProductList from './components/ProductList'
import FeaturesBar from './components/FeaturesBar'
import Footer from './components/Footer'
import WhatsAppWidget from './components/WhatsAppWidget'

export default function App() {
  return (
    <div className="bg-background text-on-surface font-body selection:bg-secondary-container selection:text-on-secondary-container min-h-screen">
      <Header />
      <main className="min-h-screen">
        <Hero />
        <Categories />
        <ProductList />
        <FeaturesBar />
      </main>
      <Footer />
      <WhatsAppWidget />
    </div>
  )
}
