import { useState, useEffect, useMemo } from 'react'
import { Link, useOutletContext } from "react-router-dom"

import axios from 'axios'

import Pagination from '../../components/Pagination'
import Loading from '../../components/Loading'

function Products(){
  const [products, setProducts] = useState([])
  const [pagination, setPagination] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [request, setRequest] = useState('')




  const filterProducts = useMemo(() => {
    return products.filter((item) => item.category.match(request))
  }, [request])

  const getProducts = async (page = 1) => {
    setIsLoading(true)
    const productRes = await axios.get(`/v2/api/${import.meta.env.VITE_API_PATH}/products?page=${page}`)
    setProducts(productRes.data.products)
    setPagination(productRes.data.pagination)
    setIsLoading(false)
  }

  useEffect(() => {
 
    getProducts()

  },[])

  const handleChange = (e) => {
    setRequest(e.target.name)
  }


  return(<>

    <div className="container mt-md-5 mt-3 mb-7">
      <Loading isLoading={isLoading}/>
      <div className="row">
        <div className="col-md-2 me-2">
          <div className="accordion border border-bottom border-top-0 border-start-0 border-end-0 mb-3" id="accordionExample">
            <div className="card border-0">

              <button type="button" name='' className='btn btn-outline-primary mb-1' onClick={handleChange}>全部</button>
              <button type="button" name='項鍊' className='btn btn-outline-primary mb-1' onClick={handleChange}>項鍊</button>
              <button type="button" name='耳環' className='btn btn-outline-primary mb-1' onClick={handleChange}>耳環</button>
              <button type="button" name='戒指' className='btn btn-outline-primary mb-1' onClick={handleChange}>戒指</button>
              <button type="button" name='手珠' className='btn btn-outline-primary mb-1' onClick={handleChange}>手珠</button>
              <button type="button" name='手鐲' className='btn btn-outline-primary mb-1' onClick={handleChange}>手鐲</button>

            </div>

          </div>
        </div>
    
        <div className="col-md-8 ms-4">
          <div className="row">
            { request.length === 0 ? 
              (products.map((product) => {
                return (<div className="col-md-6" key={product.id}>
                  <div className="card border-0 mb-4 position-relative position-relative">
                    <Link to={`/product/${product.id}`} className="text-dark">
                      <img src={product.imageUrl} className="card-img-top rounded-0 object-fit img-height img-hover" alt="..." />
                    </Link>
                    <div className="card-body p-0">
                      <h4 className="mb-0 mt-1"><Link to={`/product/${product.id}`} className="text-decoration-none">{product.title}</Link></h4>
                      <span className="card-text mb-0">NT${product.price} <span className="text-muted "></span></span>
                      <p className="text-muted mt-3"></p>
                    </div>
                  </div>
                </div>
                )
               })
              )
               : 
              (filterProducts.map((product) => {
                  return (<div className="col-md-6" key={product.id}>
                    <div className="card border-0 mb-4 position-relative position-relative">
                      <Link to={`/product/${product.id}`} className="text-dark">
                        <img src={product.imageUrl} className="card-img-top rounded-0 object-fit img-height" alt="..." />
                      </Link>
                      <div className="card-body p-0">
                        <h4 className="mb-0 mt-1"><Link to={`/product/${product.id}`} className="text-decoration-none">{product.title}</Link></h4>
                        <p className="card-text mb-0">NT${product.price} <span className="text-muted "><del>NT${product.origin_price}</del></span></p>
                        <p className="text-muted mt-3"></p>
                      </div>
                    </div>
                  </div>
                )}
              ))
            }
            
          </div>
          {
            request.length === 0 && (
              <nav className="d-flex justify-content-center">
                <Pagination pagination={pagination} changePage={getProducts} />
              </nav>
            )
          }
          
        </div>
      </div>
    </div>

  </>)
}

export default Products