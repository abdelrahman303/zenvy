import { useEffect } from 'react'


export default function Order() {
  useEffect(() => {
    document.title = 'Order'
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="h-screen flex items-center justify-center" >

        <h1>Welcome to the Order Page</h1>




    </div>
  )
}