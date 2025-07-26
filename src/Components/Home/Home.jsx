import { useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'; // Make sure to install uuid: npm install uuid
import HeroSection from './HeroSection/HeroSection'
// import ShopbyCategories from './ShopbyCategories/ShopbyCategories'
import Category from '../Category/Category';


export default function Home() {
  useEffect(() => {
    document.title = 'Home'
    window.scrollTo(0, 0)


    const guestId = localStorage.getItem('guest_id')
    if (!guestId) {
      const newGuestId = uuidv4()
      localStorage.setItem('guest_id', newGuestId)
      console.log('Generated new guest_id:', newGuestId);

    }
  }, [])

  return (
    <div className="" >
      <HeroSection />
      <Category />
    </div>
  )
}