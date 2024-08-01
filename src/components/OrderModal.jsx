import { useContext, useEffect, useState} from "react"

import axios from "axios"

function OrderModal({ closeOrderModal }){


  return (
    <div
      className='modal fade'
      id='orderModal'
      tabIndex='-1'
      aria-labelledby='exampleModalLabel'
      aria-hidden='true'
    >
      <div className='modal-dialog modal-lg'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h1 className='modal-title fs-5' id='orderModal'>
              訂單資訊
            </h1>
            <button type='button' className='btn-close' aria-label='Close' onClick={closeOrderModal} />
          </div>
          <div className='modal-body'>
          <div className="row">
            <div className='form-group mb-2 col-md-5'>
              <label className='w-100' htmlFor='name'>
                訂購者
                <input
                  type='text'
                  id='name'
                  name='name'
                  placeholder=''
                  className='form-control mt-1'
                />
              </label>
            </div> 
            <div className='form-group mb-2 col-md-7'>
              <label className='w-100' htmlFor='email'>
                  Email
                <input
                  type='email'
                  id='email'
                  name='email'
                  placeholder=''
                  className='form-control mt-1'
                />
              </label>
            </div>
            
            <div className='form-group mb-2 col-md-6'>
              <label className='w-100' htmlFor='address'>
                外送地址
                <input
                  type='text'
                  id='address'
                  name='address'
                  placeholder=''
                  className='form-control mt-1'
                />
              </label>
            </div>
              <div className='form-group mb-3 col-md-6' rows="5">
              <label className='w-100' htmlFor='message'>
                留言
                <textarea
                  type='text'
                  id='message'
                  name='message'
                  placeholder=''
                  className='form-control mt-1'
                />
              </label>
            </div> 
          </div> 
            <div className='row'>
              <div className='form-group mb-2 col-md-10'>
                <label className='w-100' htmlFor='productName'>
                  品項名稱
                <input
                  type='text'
                  id='productName'
                  name='productName'
                  placeholder=''
                  className='form-control mt-1'
                />
                </label>
              </div>
              <div className='col-md-2 mb-2'>
                <label className='w-100' htmlFor='qty'>
                  數量
                <input
                  type='number'
                  id='qty'
                  name='qty'
                  placeholder=''
                  className='form-control mt-1'
                />
                </label>
              </div>
              <div className='form-group mb-2 col-md-10 d-flex justify-content-end mt-1'>
                總金額
              </div>
              <div className='form-group mb-2 col-md-2 d-flex justify-content-start mt-1'>
                $1200
              </div>
            </div>
            <hr/>
            <h5>修改訂單狀態</h5>
            <label className='form-check-label mb-2' htmlFor='progress'>
              外送進度
              <select className="form-select mt-2" aria-label="Default select example" name="progress" id='progress'>
                <option value="uncheck">未確認</option>
                <option value="checked">已確認</option>
                <option value="delivering">已出貨</option>
                <option value="arrived">已送達</option>
              </select>
            </label>
          </div>
          <div className='modal-footer'>
            
            <button type='button' className='btn btn-secondary' onClick={closeOrderModal}>
              關閉
            </button>
            <button type='button' className='btn btn-primary'>
              儲存
            </button>
          </div>
        </div>
      </div>
    </div>
  )
    
}

export default OrderModal