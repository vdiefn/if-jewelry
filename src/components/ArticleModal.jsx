import { useState, useEffect, useContext } from 'react'

import axios from 'axios'

import { MessageContext, handleErrorMessage, handleSuccessMessage } from "../store/messageStore"


function ArticleModal({ closeModal, getArticles, tempArticle, type }){
  const [date, setDate] = useState(new Date())
  const [message, dispatch] = useContext(MessageContext)

  const [tempData, setTempData] = useState({
      title: "",
      description: "",
      image: "",
      tag: ['tag1', 'tage2'],
      create_at: 123455,
      author: "",
      isPublic: false,
      content: "123"
    }
  )

  useEffect(() => {
    if(type === 'create'){
      setTempData({
        title: "",
        description: "",
        image: "",
        tag: [],
        create_at: 1555459200,
        author: "",
        isPublic: false,
        content: ""
      })
      setDate(new Date())
    } else if(type === 'edit') {
      setTempData(tempArticle)
      setDate(new Date(tempArticle.create_at))
      
    }
  }, [type, tempArticle ])


  const handleChange = (e) => {
    const { value, name } = e.target
    if (name === 'isPublic') {
      setTempData((pre) => ({ ...pre, [name]: e.target.checked }))
    } else {
      setTempData((pre) => ({ ...pre, [name]: value }))
    }
  }

  
  const submit = async() => {
    try {
      let api = `/v2/api/${import.meta.env.VITE_API_PATH}/admin/article`
      let method = 'post'
      if(type === 'edit'){
        api = `/v2/api/${import.meta.env.VITE_API_PATH}/admin/article/${tempArticle.id}`
        method='put'
      }
      const res = await axios[method](
        api,
        {
          data: {
            ...tempData,
            create_at: date.getTime(),//轉換成unix timeStamp
            content:'1'
          }
        }
      )
      handleSuccessMessage(dispatch, res)
    } catch(error) {
      handleErrorMessage(dispatch, error)
      console.log(error)
    }

    closeModal()
    getArticles()
  }

  const uploadFile = async (file) => {
    if (!file) {
      return
    }
    const formData = new FormData()
    formData.append('file-to-upload', file)
    try {
      const res = await axios.post(`/v2/api/${import.meta.env.VITE_API_PATH}/admin/upload`, formData)
      console.log(res)
      setTempData({
        ...tempData,
        image: res.data.image
      })
    } catch (error) {
      console.log(error)
    }
  } 


  return (<>
    <div
      className='modal fade'
      tabIndex='-1'
      aria-labelledby='exampleModalLabel'
      aria-hidden='true'
      id='articleModal'
    >
      <div className='modal-dialog modal-lg'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h1 className='modal-title fs-5' id='articleModal'>
              {
                type === 'create' ? '建立新內容' : `編輯：${tempData.title}`
              }
            </h1>
            <button
              type='button'
              className='btn-close'
              aria-label='Close'
              onClick={closeModal}
            />
          </div>
          <div className='modal-body'>
            <div className='row'>
              <div className='col-sm-4'>
                <div className='form-group mb-2'>
                  <label className='w-100' htmlFor='image'>
                    輸入圖片網址
                    <input
                      type='text'
                      name='image'
                      id='image'
                      placeholder='請輸入圖片連結'
                      className='form-control'
                      onChange={handleChange}
                      value={tempData.image || ''}
                    />
                  </label>
                </div>
                <div className='form-group mb-2'>
                  <label className='w-100' htmlFor='customFile'>
                    或 上傳圖片
                    <input type="file" id='customFile' className='form-control mt-1' name="file-to-upload" onChange={(e) => uploadFile(e.target.files[0])} />
                  </label>
                  <hr className='my-4' />
                  {tempData.image && (
                    <img src={tempData.image} className='img-fluid' alt='' />
                  )}
                </div>
                <img src="" alt='' className='img-fluid' />
              </div>

              <div className='col-sm-8'>
                <div className='form-group mb-2'>
                  <label className='w-100' htmlFor='title'>
                    標題
                    <input
                      type='text'
                      id='title'
                      name='title'
                      placeholder='請輸入標題'
                      className='form-control'
                      onChange={handleChange}
                      value={tempData.title || ''}
                    />
                  </label>
                </div>


                <div className='row'>
                  <div className='form-group mb-2 col-md-6'>
                    <label className='w-100' htmlFor='author'>
                      作者
                      <input
                        type='text'
                        id='author'
                        name='author'
                        placeholder=''
                        className='form-control'
                        onChange={handleChange}
                        value={tempData.author || ''}
                      />
                    </label>
                  </div>
                  <div className='form-group mb-2 col-md-6'>
                    <label className='w-100' htmlFor='create_at'>
                      日期
                      <input
                        type='date'
                        id='create_at'
                        name='create_at'
                        placeholder='日期'
                        className='form-control'
                        onChange={(e) => {
                          console.log(e)
                          setDate(new Date(e.target.value))
                          console.log(date)
                        }}
                        value={`${date.getFullYear().toString()}-${(
                          date.getMonth() + 1
                        )
                          .toString()
                          .padStart(2, 0)}-${date
                            .getDate()
                            .toString()
                            .padStart(2, 0)}`}
                      />
                    </label>
                  </div>
                </div>

                <div className='col-sm-12'>

                  <div className='form-group mb-2' style={{display: 'none'}}>
                    <label className='w-100' htmlFor='content'>
                      次標題
                      <input
                        type='text'
                        id='content'
                        name='content'
                        placeholder=''
                        className='form-control'
                        // onChange={handleChange}
                        // value={tempData.content || '4'}
                        defaultValue='content'
                      />
                    </label>
                  </div>

                <div className='form-group mb-2'>
                    <label className='w-100' htmlFor='description'>
                      文章內容
                      <textarea
                        type='text'
                        id='description'
                        name='description'
                        placeholder=''
                        className='form-control'
                        cols='40'
                        rows='15'
                        onChange={handleChange}
                        value={tempData.description || ''}
                      />
                  </label>
                </div>
                
                <div className='form-group mb-2'>
                  <div className='form-check'>
                    <label
                      className='w-100 form-check-label'
                      htmlFor='is_public'
                    >
                      是否公開
                      <input
                        type='checkbox'
                        id='isPublic'
                        name='isPublic'
                        placeholder=''
                        className='form-check-input'
                        onChange={handleChange}
                        checked={tempData.isPublic}
                      />
                    </label>
                  </div>
                </div>
              </div>

              </div>
                    
            </div>
          </div>
          <div className='modal-footer'>
            <button type='button' className='btn btn-secondary' onClick={closeModal}>
              關閉
            </button>
            <button type='button' className='btn btn-primary' onClick={submit}> 
              儲存
            </button>
          </div>
        </div >
      </div>
    </div>
  </>
  )

}

export default ArticleModal