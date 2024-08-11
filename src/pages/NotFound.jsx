import { useEffect } from "react"
import { useNavigate, } from "react-router-dom"


function NotFound() {
  const navigate = useNavigate()

  useEffect(() => {
    setTimeout(() => {
      navigate('/')
    }, 3000)

  }, [navigate])
  
  

  return ( <>

    <div className="position-relative">
      <div className="position-absolute" style={{ top: '0', bottom: '0', left: '0', right: '0', backgroundImage: 'url(https://images.unsplash.com/photo-1480399129128-2066acb5009e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80)', backgroundPosition: 'center center', opacity: '0.1' }}></div>
      <div className="container d-flex flex-column justify-content-center align-items-center" style={{ height:'100vh' }} >
        
          <div className="col-md-6 text-center">
          <h3 className='mb-4'>該頁面不存在！！！</h3>
          <h6 className="card-subtitle mb-2 text-body-secondary fw-bold mb-2 text-center">三秒後自動跳轉回到首頁</h6>
          </div>

      </div>
    </div>
  </>
  )
}

export default NotFound