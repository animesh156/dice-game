import { useEffect } from "react"
import {toast, ToastContainer} from 'react-toastify'
import {useNavigate} from 'react-router-dom'

function Home() {
  
  const navigate = useNavigate()

  useEffect(() => {
    const isAuthorize = localStorage.getItem("isAuthenticated")

    if(!isAuthorize) {
      toast.error('Only authorized user can access')
     

      setTimeout(() => {
        navigate('/login')
      },2000)
    }
  },[navigate])

  const isAuthorize = localStorage.getItem("isAuthenticated")

  return (
    <>
      <ToastContainer />
      {!isAuthorize ? null : <div className="text-center">Home</div>}
    </>
  );
}

export default Home