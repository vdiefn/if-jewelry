import { useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"


function NotFound() {
  const navigate = useNavigate()

  useEffect(() => {
    setTimeout(() => {
      navigate('/')
    }, 3000)

  }, [navigate])
  
  

  return ( <>
    <h1>該頁面不存在！</h1>
    <p>三秒後自動跳轉至首頁，或前往以下頁面：</p>
    <Link to='/'>首頁</Link>
    <Link to='/articles'>關於</Link>
    <Link to='/products'>產品列表</Link>
  </>
  )
}

export default NotFound