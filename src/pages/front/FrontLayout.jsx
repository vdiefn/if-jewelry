import { Outlet, useLocation, useParams } from "react-router-dom"
import { useEffect, useState, useReducer } from "react"
import axios from "axios"
import { MessageContext, messageReducer, initState } from '../../store/messageStore'
import Message from '../../components/Message';
import Navbar from "../../components/Navbar"
import Loading from '../../components/Loading'

function FrontLayout() {
  const location = useLocation() //確認目前路由
  const { orderId } = useParams()
  const [ cartData, setCartData ] = useState({})
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const reducer = useReducer(messageReducer, initState)

  const getCart = async() => {
    try {
      const res = await axios.get(`/v2/api/${import.meta.env.VITE_API_PATH}/cart`)
      setCartData(res.data.data)
    } catch(error) {
      console.log(error)
    }
  }

  const getParams = async() => {
    try {
      const res = await axios.get(
        `/v2/api/${import.meta.env.VITE_API_PATH}/order/${orderId}`,
      )
      setCartData(res.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getProducts = async (page = 1) => {
    setIsLoading(true)
    const productRes = await axios.get(`/v2/api/${import.meta.env.VITE_API_PATH}/products?page=${page}`)
    setProducts(productRes.data.products)
    setIsLoading(false)
  }
  
  useEffect(() => {
    getCart()
  }, [])
  
  useEffect(() => {
    getParams()
  }, [])



  return (
    <MessageContext.Provider value={reducer}>
      <Message />
    <div className="position-relative" style={{ display: (location.pathname === `/success/${orderId}` ? 'none' : 'flex') }}>
      <div className="position-absolute" style={{ top: '0', bottom: '0', left: '0', right: '0', backgroundImage: 'url(https://images.unsplash.com/photo-1480399129128-2066acb5009e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80)', backgroundPosition: 'center center', opacity: '0.1' }}></div>
      <div className="container d-flex flex-column" style={{ minHeight: (location.pathname === '/' ? '80vh' : '5vh') }} >
        <Navbar cartData={cartData} />
        <div className="row justify-content-center my-auto" style={{ display: (location.pathname === '/' ? 'flex' : 'none') }}>
          <div className="col-md-4 text-center">
            <h2>If Jewelry</h2>
            <p className="text-muted mb-0">如果，代表一切可能。</p>
            <p className="text-muted mb-0">如果，代表所有機會。</p>
            <p className="text-muted mb-0">如果，代表所有改變。</p>
          </div>
          
        </div>
      </div>
    </div>
    
  
    
    <Outlet context={{ getCart, cartData, getProducts, products  }}></Outlet>
    <div className="bg-light py-4 mt-5">
    </div>
    <div className="bg-dark py-5">
      <div className="container">
        <div className="d-flex align-items-center justify-content-between text-white mb-md-7 mb-4">
          <a className="text-white h4 text-decoration-none" href="./index.html">If Jewelry 如果珠寶</a>
          <ul className="d-flex list-unstyled mb-0 h4">
            <li><a href="#" className="text-white mx-3"><i className="fab fa-facebook"></i></a></li>
            <li><a href="#" className="text-white mx-3"><i className="fab fa-instagram"></i></a></li>
            <li><a href="#" className="text-white ms-3"><i className="fab fa-line"></i></a></li>
          </ul>
        </div>
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end align-items-start text-white">
          <div className="mb-md-0 mb-1">
              <p className="mb-0"><i className="bi bi-telephone"></i>&emsp;02-3456-7890</p>
              <p className="mb-0"><i className="bi bi-envelope"></i>&emsp;service@mail.com</p>
          </div>
          <p className="mb-0">© 2024 If Jewelry All Rights Reserved.</p>
        </div>
      </div>
    </div>
    </MessageContext.Provider>)
}

export default FrontLayout