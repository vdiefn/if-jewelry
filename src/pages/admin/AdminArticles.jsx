import { useEffect, useState, useRef } from "react";
import { Modal } from 'bootstrap'
import axios from 'axios'

import ArticleModal from "../../components/ArticleModal";


function AdminArticles(){
  const [ articles, setArticles] = useState([])
  const [ pagination, setPagination ] = useState({})

  const articleModal = useRef(null)

  useEffect(() => {
    articleModal.current = new Modal('#articleModal', {
      backdrop: 'static'
    });
    // deleteModal.current = new Modal('#deleteModal', {
    //   backdrop: 'static'
    // })
    getArticles()
  }, [])

  const openArticleModal = () => {
    articleModal.current.show()
  }


  const closeArticleModal = () => {
    articleModal.current.hide()
  }

  const getArticles = async(page=1) =>{
    const res = await axios.get(`/v2/api/${import.meta.env.VITE_API_PATH}/admin/articles?page=${page}`)
    console.log(res)
    setArticles(res.data.articles)
  }

  return(<>
    <ArticleModal closeArticleModal={closeArticleModal} closeModal={closeArticleModal} getArticles={getArticles}/>
    <div className="p-3">
    <h3>常見問題列表</h3>
    <hr />
    <div className="text-end">
      <button
        type="button"
        className="btn btn-primary btn-sm"
        onClick={openArticleModal}
      >
        建立新問答
      </button>
    </div>
    <table className="table">
      <thead>
        <tr>
          <th scope="col">標籤</th>
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
              <td>{`${article.tag[0]},${article.tag[1]}`}</td>
              <td>{article.create_at}</td>
              <td>{article.title}</td>
              <td>{article.author}</td>
              <td>{article.is_public ? '公開' : '隱藏'}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  // onClick={() => openProductModal('edit', product)}
                >
                  編輯
                </button>
                <button
                  type="button"
                  className="btn btn-outline-danger btn-sm ms-2"
                  // onClick={() => openDeleteModal(product)}
                >
                  刪除
                </button>
              </td>
            </tr>
          )
        })}

      </tbody>
    </table>
  </div>
  </>)

}

export default AdminArticles