import { useState, useEffect, useContext } from 'react'
import { useParams, useOutletContext, Link } from 'react-router-dom'
import axios from 'axios'
import { MessageContext, handleErrorMessage, handleSuccessMessage } from "../../store/messageStore"
import Loading from '../../components/Loading'

function ProductDetail() {
  const [product, setProduct] = useState({});
  const [cartQuantity, setCartQuantity ] = useState(1)
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false)
  const [pause, setPause] = useState(false)
  const { getCart } = useOutletContext();
  const [message, dispatch] = useContext(MessageContext)

  const getProduct = async (id) => {
    setIsLoading(true)
    const productRes = await axios.get(
      `/v2/api/${import.meta.env.VITE_API_PATH}/product/${id}`,
    );
    
    setProduct(productRes.data.product)
    setIsLoading(false)
  };

  const addToCart = async() => {
    const data = {
      data: {
        product_id: product.id,
        qty: cartQuantity
      }
    }
    setPause(true)
    try {
      const res = await axios.post(`/v2/api/${import.meta.env.VITE_API_PATH}/cart`, data)
      getCart();
      setPause(false)
      handleSuccessMessage(dispatch, res)

    } catch (error) {
      console.log(error)
      setPause(false)
      handleErrorMessage(dispatch, error)
    }
    
  }

  useEffect(() => {
    getProduct(id);
    
  }, [id]);

  return(<>
    <div className="container mt-5">
    <Loading isLoading={isLoading} />
    <div className="row align-items-center">
      <div className="col-md-7">
        <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
                <img src={product.imageUrl} className="d-block w-100 product-img-height object-fit" alt="..." />
            </div>
          </div>
        </div>
      </div>
        <div className="col-md-5">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb bg-white px-0 mb-0 py-3">
              <li className="breadcrumb-item"><Link className="text-muted text-decoration-none" to='/products'>回到產品列表</Link></li>
              <li className="breadcrumb-item active" aria-current="page"></li>
            </ol>
          </nav>
          <h3 className="fw-bold mb-4">{product.title}</h3>
          <p className="h5 text-end">NT${product.price}</p>
          <div className="row align-items-center">
            <div className="col-6">
              <div className="input-group my-3 bg-light rounded">
                <div className="input-group-prepend">
                  <button className="btn btn-outline-dark border-0 py-2" type="button" id="button-addon1" onClick={() => setCartQuantity((pre) => pre === 1 ? pre : pre - 1)}>
                    <i className="bi bi-dash-circle"></i>
                  </button>
                </div>
                <input 
                  type="number" 
                  className="form-control border-0 text-center my-auto shadow-none bg-light" 
                  placeholder="" 
                  aria-label="Example text with button addon" 
                  aria-describedby="button-addon1"
                  value={cartQuantity} 
                  readOnly />
                <div className="input-group-append">
                  <button className="btn btn-outline-dark border-0 py-2" type="button" id="button-addon2" onClick={() => setCartQuantity((pre) => pre + 1)}>
                    <i className="bi bi-plus-circle"></i>
                  </button>
                </div>
              </div>
            </div>
            <div className="col-6">
              <button 
                type='button' 
                href="./checkout.html" 
                className="text-nowrap btn btn-dark w-100 py-2" 
                onClick={()=>addToCart()}
                disabled={pause}
              >
                加入購物車
              </button>
              <Link to='/cart' className='text-decoration-none'><p className='text-muted text-end mt-3'>前往結帳</p></Link>
            </div>
          </div>
        </div>
    </div>
    <div className="row my-5">
        <div className="col-md-4 text-muted pre-wrap">
          <p>{product.description}</p>
      </div>
      <div className="col-md-8">
          <p className="pre-wrap" >{product.content}</p>
      </div>
    </div>
    </div>     
  </>)
}

export default ProductDetail