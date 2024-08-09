import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

import axios from 'axios'

function ArticleDetail(){
  const [article, setArticle ] = useState({})
  const { id } = useParams()

  const getArticle = async() => {
    const res = await axios.get(`/v2/api/${import.meta.env.VITE_API_PATH}/article/${id}`)
    console.log(res)
    setArticle(res.data.article)
    
  }

  useEffect(() => {
    getArticle(id)
  }, [id])


  return(<>
    <div className="container">
    <div className="row align-items-center">
        <div className="col-md-12 d-flex justify-content-start align-items-center" style={{ top: '0', bottom: '0', left: '0', right: '0', backgroundImage: 'url(https://images.unsplash.com/photo-1586775490184-b79f0621891f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)', backgroundPosition: 'center center', opacity: '0.8', height: '10rem', color: 'black' }}>
          <h2 className="fw-bold h1 mb-1 mt-2">{article.title}</h2>
    </div>
      
    </div>
    <div className="row my-5">
        <div className="col-md-12 pre-wrap">
          <p>{article.description}</p>
      </div>

    </div>
    </div>
  </>
  )

}

export default ArticleDetail