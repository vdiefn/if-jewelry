import { useEffect, useState, useRef } from "react";
import { Modal } from 'bootstrap'
import axios from 'axios'

import ArticleModal from "../../components/ArticleModal";
import DeleteModal from "../../components/DeleteModal";
import Pagination from "../../components/Pagination";


function AdminArticles(){
  const [ articles, setArticles] = useState([])
  const [ pagination, setPagination ] = useState({})
  const [ type, setType ] = useState('create')
  const [ tempArticle, setTempArticle ] = useState({})

  const articleModal = useRef(null)
  const deleteModal = useRef(null)

  useEffect(() => {
    articleModal.current = new Modal('#articleModal', {
      backdrop: 'static'
    });
    deleteModal.current = new Modal('#deleteModal', {
      backdrop: 'static'
    })
    getArticles()
  }, [])

  

  const openArticleModal = (type, article) => {
    setTempArticle(article)
    setType(type)
    articleModal.current.show()
  }  


  const closeModal = () => {
    articleModal.current.hide()
  }

  const openDeleteModal = (article) => {
    setTempArticle(article)
    deleteModal.current.show()
  }

  const closeDeleteModal = () => {
    deleteModal.current.hide()
  }

  const deleteArticle = async(id) => {
    try{
      const res = await axios.delete(`/v2/api/${import.meta.env.VITE_API_PATH}/admin/article/${id}`)
      console.log(res)
      if(res.data.success){
        getArticles()
        deleteModal.current.hide()
      } 

    } catch(error){
      console.log(error)
    }
  }


  const getArticles = async(page=1) =>{
    const res = await axios.get(`/v2/api/${import.meta.env.VITE_API_PATH}/admin/articles`)
    setArticles(res.data.articles)
    setPagination(res.data.pagination)
  }


  

  return(<>
    <ArticleModal 
      closeModal={closeModal} 
      getArticles={getArticles} 
      tempArticle={tempArticle}
      type={type}

    />
    <DeleteModal 
      close={closeDeleteModal}
      text={tempArticle.title}
      handleDelete={deleteArticle}
      id={tempArticle.id}
    />  
    <div className="p-3">
    <h3>文章列表</h3>
    <hr />
    <div className="text-end">
      <button
        type="button"
        className="btn btn-primary btn-sm"
        onClick={()=>openArticleModal('create',{})}
      >
        建立新文章
      </button>
    </div>
    <table className="table">
      <thead>
        <tr>
          <th scope="col">建立日期</th>
          <th scope="col">標題</th>
          <th scope="col">作者</th>
          <th scope="col">公開狀態</th>
          <th scope="col">編輯</th>
        </tr>
      </thead>
      <tbody>
        {articles.map((article) => {
          return (
            <tr key={article.id}>
              <td>{new Date(article.create_at).toISOString().split('T')[0]}</td>
              <td>{article.title}</td>
              <td>{article.author}</td>
              <td>{article.isPublic ? '公開' : '隱藏'}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={() => openArticleModal('edit', article)}
                >
                  編輯
                </button>
                <button
                  type="button"
                  className="btn btn-outline-danger btn-sm ms-2"
                  onClick={() => openDeleteModal(article)}
                >
                  刪除
                </button>
              </td>
            </tr>
          )
        })}

      </tbody>
    </table>

    <div className='d-flex justify-content-center mt-5'>
      <Pagination pagination={pagination} changePage={getArticles} />
    </div>    
    
  </div>
  </>)

}

export default AdminArticles