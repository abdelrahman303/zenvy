import { useEffect } from 'react'


export default function Home() {
  useEffect(() => {
    document.title = 'Home'
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="h-screen flex items-center justify-center" >
      <h1 className="text-4xl font-bold">Welcome to the Home Page</h1>



    </div>
  )
}