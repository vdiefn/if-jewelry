import { Outlet, useLocation, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import Navbar from "../../components/Navbar"

function FrontLayout() {
  const location = useLocation() //確認目前路由
  const { orderId } = useParams()
  const [ cartData, setCartData ] = useState({})

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
      console.log('結帳資訊', res)
      setCartData(res.data.data)
    } catch (error) {
      console.log(error)
    }
  }
  
  useEffect(() => {
    getCart()
  }, [])
  
  useEffect(() => {
    getParams()
  }, [])



  return (<>
    <div className="position-relative" style={{ display: (location.pathname === `/success/${orderId}` ? 'none' : 'flex') }}>
      <div className="position-absolute" style={{ top: '0', bottom: '0', left: '0', right: '0', backgroundImage: 'url(https://images.unsplash.com/photo-1480399129128-2066acb5009e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80)', backgroundPosition: 'center center', opacity: '0.1' }}></div>
      <div className="container d-flex flex-column" style={{ minHeight: (location.pathname === '/' ? '80vh' : '10vh') }} >
        <Navbar cartData={cartData} />
        <div className="row justify-content-center my-auto" style={{ display: (location.pathname === '/' ? 'flex' : 'none') }}>
          <div className="col-md-4 text-center">
            <h2>If Jewelry</h2>
            <p className="text-muted mb-0">如果，代表一切可能。</p>
            <p className="text-muted mb-0">如果，代表所有機會。</p>
            <p className="text-muted mb-0">如果，代表所有改變。</p>
            <p className="text-muted mb-0">如果，讓我……</p>
          </div>
          
        </div>
      </div>
    </div>
    
  
    
    <Outlet context={{ getCart, cartData }}></Outlet>
    <div className="bg-light py-4 mt-5">
      <div className="container">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center align-items-start">
          <p className="mb-0 fw-bold">Lorem ipsum dolor sit amet.</p>
          <div className="input-group w-md-50 mt-md-0 mt-3">
            <input type="text" className="form-control rounded-0" placeholder="" />
            <div className="input-group-append">
              <button className="btn btn-dark rounded-0" type="button" id="search">
                Lorem ipsum
              </button>
            </div>
            
          </div>
        </div>
      </div>
    </div>
    <div className="bg-dark py-5">
      <div className="container">
        <div className="d-flex align-items-center justify-content-between text-white mb-md-7 mb-4">
          <a className="text-white h4" href="./index.html">LOGO</a>
          <ul className="d-flex list-unstyled mb-0 h4">
            <li><a href="#" className="text-white mx-3"><i className="fab fa-facebook"></i></a></li>
            <li><a href="#" className="text-white mx-3"><i className="fab fa-instagram"></i></a></li>
            <li><a href="#" className="text-white ms-3"><i className="fab fa-line"></i></a></li>
          </ul>
        </div>
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end align-items-start text-white">
          <div className="mb-md-0 mb-1">
            <p className="mb-0">02-3456-7890</p>
            <p className="mb-0">service@mail.com</p>
          </div>
          <p className="mb-0">© 2020 LOGO All Rights Reserved.</p>
        </div>
      </div>
    </div>
  </>)
}

export default FrontLayout