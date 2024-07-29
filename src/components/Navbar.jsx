import { NavLink } from "react-router-dom"

function Navbar({ cartData }){
  return(<>
    <nav className="navbar navbar-expand-lg navbar-light">
      <NavLink className="navbar-brand" to='/'>If Jewelry</NavLink>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <NavLink className="nav-item nav-link me-4 active" to='/'>Home <span className="sr-only">(current)</span></NavLink>
          <NavLink className="nav-item nav-link me-4" to='/products'>產品列表</NavLink>
          <NavLink className="nav-item nav-link me-4" href="./detail.html">Detail</NavLink>
          <NavLink className="nav-item nav-link me-4 position-relative" href="./cart.html">
            <i className="bi bi-cart-check"></i>
            <span className="position-absolute top-2 start-100 translate-middle badge rounded-pill bg-danger">
              {cartData?.carts?.length}
            </span>
          </NavLink>
        </div>
      </div>
    </nav>
  
  </>
  )
}

export default Navbar