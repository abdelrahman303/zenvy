import { useEffect } from 'react'


export default function Login() {
  useEffect(() => {
    document.title = 'Login'
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="h-screen flex items-center justify-center" >

        <h1>Welcome to the Login Page</h1>




    </div>
  )
}