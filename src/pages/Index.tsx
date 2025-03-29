import Navbar from "@/components/layout/Navbar"
import Hero from "@/components/home/Hero"
import CategorySection from "@/components/home/CategorySection"
import FeaturedServices from "@/components/home/FeaturedServices"
import Stats from "@/components/home/Stats"
import PopularServices from "@/components/home/PopularServices"
import Reviews from "@/components/home/Reviews"
import Footer from "@/components/layout/Footer"
import { Phone } from "lucide-react"
import { Button } from "@/components/ui/button"

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <CategorySection />
        <FeaturedServices />
        <Stats />
        <PopularServices />
        <Reviews />
        {/* <BlogSection /> */}
      </main>
      <Footer />

      {/* Call Icon */}
      <a href="tel:7489301982" className="fixed bottom-6 right-6 z-50">
        <Button className="rounded-full w-14 h-14 p-0 shadow-lg bg-primary hover:bg-primary/90" aria-label="Call">
          <Phone className="h-6 w-6" />
        </Button>
      </a>

    </div>
  )
}

export default Index

