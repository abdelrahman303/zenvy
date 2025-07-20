import { useEffect } from 'react'
import HeroSection from './HeroSection/HeroSection'
import ShopbyCategories from './ShopbyCategories/ShopbyCategories'


export default function Home() {
  useEffect(() => {
    document.title = 'Home'
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="" >

      <HeroSection />
      <ShopbyCategories />




    </div>
  )
}