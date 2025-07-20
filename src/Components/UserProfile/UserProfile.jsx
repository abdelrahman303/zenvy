import { useEffect } from 'react'


export default function UserProfile() {
    useEffect(() => {
        document.title = 'Profile'
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className="h-screen flex items-center justify-center" >

            <h1>hello from user profile</h1>




        </div>
    )
}