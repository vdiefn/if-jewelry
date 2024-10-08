import { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import Loading from '../../components/Loading'

import axios from 'axios'

function Home() {

  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const getProducts = async () => {
    setIsLoading(true)
    const productRes = await axios.get(`/v2/api/${import.meta.env.VITE_API_PATH}/products`)
    setProducts(productRes.data.products)
    setIsLoading(false)
  }

  useEffect(() => {
    getProducts()

  }, [])
    
  return (<div className="container">
    <Loading isLoading={isLoading} />
    
    <div className="row ">
      <Link to='/products' className='text-decoration-none mt-4'><span className='text-muted'>More+</span></Link> 
      {
        products?.slice(0, 3).map((product) => {
          return (<div className="col-md-4 mt-md-4" key={product.id}>
            <Link to={`/product/${product.id}`} className='text-decoration-none'>
              <div className="card border-0 mb-4" >

                <img
                  src={product.imageUrl}
                  className="card-img-top rounded-0 object-fit home-img-height img-hover"
                  alt="..."
                />
                <div className="card-body text-center">
                  <h4 >{product.title}</h4>
                  <div className="d-flex justify-content-between">
                    <p className="card-text text-muted mb-0">
                    </p>
                  </div>
                </div>

              </div>
            </Link >
          </div> 

          )
        })
      }
    </div>  

     
    <div className="bg-light mt-5">
      <div className="container">
        <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <div className="row justify-content-center py-7">
                <div className="col-md-6 text-center mt-3">
                  <h4>關於簡約</h4>
                  <h4 className="my-5">「真正的優雅奠基於簡約之上。」</h4>
                  <p><small>—Ms. Chanel—</small></p>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <div className="row justify-content-center py-7">
                <div className="col-md-6 text-center">
                  <h3></h3>
                  <p className="my-5">「時尚不只存在於服裝中。它在天空、也在街頭，時尚與概念、生活、當下皆息息相關。」</p>
                  <p><small>—Ms. Chanel—</small></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="container my-7">
      <div className="row">
        {
          products?.slice(3, 4).map((product) => {
            return (<div className="row justify-content-between mt-4" key={product.id}>
              <div className="col-md-6">
                <Link to={`/product/${product.id}`}>
                  <img src={product.imageUrl} alt="" className="img-fluid img-hover" />
                </Link>
              </div>
              <div className="col-md-6 m-auto text-center">
                <Link to={`/product/${product.id}`} className='text-decoration-none'>
                  <h4 className="mt-4 text-align-right mb-4">{product.title}</h4>
                  <p className="text-muted pre-wrap text-align-right">
                    {
                      product.content.length>10? product.content.substr(0,32)+'......' : product.content
                    }

                  </p>
                </Link>
              </div>
            </div>)
          }) 
        }

        {
          products?.slice(4, 5).map((product) => {
            return (<div className="row flex-row-reverse justify-content-between mt-4" key={product.id}>
              <div className="col-md-6">
                <Link to={`/product/${product.id}`} >
                  <img src={product.imageUrl} alt="" className="img-fluid img-hover" />
                </Link>
              </div>
              <div className="col-md-6 m-auto text-center">
                <Link to={`/product/${product.id}`} className='text-decoration-none'>
                  <h4 className="mt-4 text-align-left mb-4">{product.title}</h4>
                  <p className="text-muted pre-wrap text-align-left">
                    {
                      product.content.length > 10 ? product.content.substr(0, 39) +'······' : product.content
                    } 
                  </p>
                </Link>
              </div>
            </div>)
          })
        }
      </div>
    </div>

  </div>  
)}

export default Home