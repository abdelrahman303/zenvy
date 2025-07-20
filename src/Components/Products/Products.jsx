import { useEffect } from 'react'


export default function Collections() {
  useEffect(() => {
    document.title = 'Collections'
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="h-screen flex items-center justify-center" >
        <h1>Welcome to the Collections Page</h1>





    </div>
  )
}