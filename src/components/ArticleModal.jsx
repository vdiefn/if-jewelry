import { useState, useEffect } from 'react'

import axios from 'axios'


function ArticleModal({closeArticleModal, closeModal, getArticles}){
  const [tempData, setTempData] = useState({
      title: "",
      description: "",
      image: "",
      tag: [],
      create_at: '1555459200',
      author: "",
      isPublic: false,
      content: "123"
    }
  )

  const handleChange = (e) => {
    const { value, name } = e.target
    setTempData((pre) => ({ ...pre, [name]: value }))
  }
  console.log(tempData)
  
  const submit = async() => {
    try {
      const res = await axios.post(
        `/v2/api/${import.meta.env.VITE_API_PATH}/admin/article`, {
          data:tempData
        }
      );
      console.log(res)

    } catch(error) {
      console.log(error)
    }

    closeModal()
    getArticles()
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
              建立新內容
            </h1>
            <button
              type='button'
              className='btn-close'
              aria-label='Close'
              onClick={closeArticleModal}
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
                      name='imageUrl'
                      id='image'
                      placeholder='請輸入圖片連結'
                      className='form-control'
                      onChange={handleChange}
                      value={tempData.imageUrl || ''}
                    />
                  </label>
                </div>

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
                        onChange={handleChange} 
                        value={tempData.create_at || ''}
                          
                      />
                    </label>
                  </div>
                </div>
                <hr />
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
                        id='is_public'
                        name='is_public'
                        placeholder=''
                        className='form-check-input'
                        onChange={handleChange}
                        value={tempData.is_public ||''}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='modal-footer'>
            <button type='button' className='btn btn-secondary' onClick={closeArticleModal}>
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