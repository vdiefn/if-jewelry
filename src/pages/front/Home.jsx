import { useState, useEffect } from 'react'
import { Link } from "react-router-dom"

import axios from 'axios'


function Home() {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const getProducts = async () => {
    setIsLoading(true)
    const productRes = await axios.get(`/v2/api/${import.meta.env.VITE_API_PATH}/products`)
    console.log('Home:',productRes)
    setProducts(productRes.data.products)
    setIsLoading(false)
  }

  useEffect(() => {
    getProducts()

  }, [])
    
  return(<>
    <div className="container">
      <div className="row mt-5 mb-2">
      {
          products?.slice(0, 3).map((product) => {
          return(<>
            <div className="col-md-4 mt-md-4" key={product.key}>
              <div className="card border-0 mb-4">
                <Link to={`/product/${product.id}`} >
                <img
                  src={product.imageUrl}
                  className="card-img-top rounded-0 object-fit img-height"
                  alt="..."
                />
                <div className="card-body text-center">
                  <h4>{product.title}</h4>
                  <div className="d-flex justify-content-between">
                    <p className="card-text text-muted mb-0">
                      {product.content}
                    </p>
                  </div>
                </div>
                </Link >
              </div>
            </div>
          </>)
          })
      }
      </div>
    </div>
    <div className="bg-light mt-5">
      <div className="container">
        <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <div className="row justify-content-center py-7">
                <div className="col-md-6 text-center mt-3">
                  <h3>Lorem ipsum.</h3>
                  <p className="my-5">“Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.”</p>
                  <p><small>—Lorem ipsum dolor sit amet.—</small></p>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <div className="row justify-content-center py-7">
                <div className="col-md-6 text-center">
                  <h3>Lorem ipsum.</h3>
                  <p className="my-5">“Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.”</p>
                  <p><small>—Lorem ipsum dolor sit amet.—</small></p>
                </div>
              </div>
            </div>

          </div>
          <Link className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="sr-only">Previous</span>
          </Link>
          <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="sr-only">Next</span>
          </a>
        </div>
      </div>
    </div>
    <div className="container my-7">
      <div className="row">
        {
          products?.slice(3, 4).map((product) => {
            return (<>
              <div className="col-md-6">
                <Link to={`/product/${product.id}`} >
                <img src={product.imageUrl} alt="" className="img-fluid" />
                </Link>
              </div>
              <div className="col-md-4 m-auto text-center">
                <Link to={`/product/${product.id}`} >
                <h4 className="mt-4">{product.title}</h4>
                <p className="text-muted">{product.content}</p>
                </Link>
              </div>
            </>)
          })
        }
        
      </div>
      <div className="row flex-row-reverse justify-content-between mt-4">
        {
          products?.slice(4, 5).map((product) => {
            return (<>
              <div className="col-md-6">
                <Link to={`/product/${product.id}`} >
                <img src={product.imageUrl} alt="" className="img-fluid" />
                </Link>
              </div>
              <div className="col-md-4 m-auto text-center">
                <Link to={`/product/${product.id}`} >
                  <h4 className="mt-4">{product.title}</h4>
                  <p className="text-muted ">{product.content}</p>
                </Link>
              </div>
            </>)
          })
        }

      </div>
    </div>
    
  
  </>
  )
}

export default Home