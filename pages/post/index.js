import React from 'react'
import Footer from '../../components/Footer/Footer'
import Navbar from '../../components/Navbar/Navbar'

function PostPage() {

    React.useEffect(()=>{
        window.location = '/'
    })

  return (
    <div>
        <Navbar/>
        <Footer/>
    </div>
  )
}

export default PostPage