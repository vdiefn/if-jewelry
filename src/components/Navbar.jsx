import { NavLink } from "react-router-dom"

function Navbar({ cartData }){
  return(<>
    <nav className="navbar navbar-expand-lg navbar-light">
      <NavLink className="navbar-brand" to='/'>如果：珠寶 If Jewelry</NavLink>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <NavLink className="nav-item nav-link me-4 active" to='/'>首頁 <span className="sr-only"></span></NavLink>
          <NavLink className="nav-item nav-link me-4" to='/about'>關於我們</NavLink>
          <NavLink className="nav-item nav-link me-4" to='/products'>產品列表</NavLink>
          <NavLink className="nav-item nav-link me-4" to='/articles'>飾品小教室</NavLink>
          <NavLink className="nav-item nav-link me-4 position-relative" to="/cart">
            <i className="bi bi-cart-check"></i>
            
              {cartData?.carts?.length !== 0 && (
              <span className="position-absolute top-2 start-100 translate-middle badge rounded-pill bg-danger">
                {cartData?.carts?.length}
              </span>
              )}
            
          </NavLink>
        </div>
      </div>
    </nav>
  
  </>
  )
}

export default Navbar