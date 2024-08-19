import { useState, useEffect, useMemo } from 'react'
import { Link } from "react-router-dom"
import Loading from '../../components/Loading'


import axios from 'axios'

function Articles(){
  const [ articles, setArticles ] = useState([])
  const [ isLoading, setIsLoading] = useState(false)

  const getArticles = async() => {
    setIsLoading(true)
    const res = await axios.get(`/v2/api/${import.meta.env.VITE_API_PATH}/articles`)
    setArticles(res.data.articles)
    setIsLoading(false)
  }

  useEffect(() => {
    getArticles()
    
  }, [])



  return (<>
  <Loading isLoading={isLoading} />
  
    <div className="container">
      <div className="row flex-fill flex-md-row-reverse flex-column">
        {
          articles?.slice(0, 1).map((article) => {
            return (<div className="col-md-12 mt-md-2" key={article.id}>
              <Link to={`/article/${article.id}`} className='text-decoration-none'>
                <div className="card border-0 mb-4 position-relative position-relative">
                  <img
                    src={article.image}
                    className="card-img-top rounded-0 article-image-height object-fit"
                    alt="..."
                  />
                  <div className="card-body p-0">
                    <h4 className="mb-0 mt-4 fw-bold">{article.title}</h4>
                    <div className="d-flex justify-content-between mt-3">
                      <p className="card-text text-muted mb-0 w-75">
                        {article.content}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            )
          })
        }
        {/* <div className="col-md-5 d-flex flex-column justify-content-center mt-md-0 mt-3 bg-light p-2" >
          <h2 className="fw-bold">時尚會變，<br></br>唯獨風格歷久不衰。</h2>
          <h5 className="font-weight-normal text-muted mt-5 text-end">
            —Ms. Chanel—
          </h5>
        </div> */}

   
      </div>
      <div className="row mt-3">


        {
          articles?.slice(1, 5).map((article) => {
            return (<div className="col-md-6 mt-md-4 mb-2" key={article.id}>
              <Link to={`/article/${article.id}`} className='text-decoration-none'>
              <div className="card border-0 mb-4 position-relative position-relative">
                <img
                  src={article.image}
                  className="card-img-top rounded-0 article-img-height  object-fit"
                  alt="..."
                />
                <div className="card-body p-0">
                  <h4 className="mb-0 mt-4 fw-bold">{article.title}</h4>
                  <div className="d-flex justify-content-between mt-3">
                    <p className="card-text text-muted mb-0 w-75">
                      {article.content}
                    </p>
                  </div>
                </div>
              </div>
              </Link>
            </div>

            )
          })
        }

      </div>
    </div>
 
  
  </>)
}

export default Articles