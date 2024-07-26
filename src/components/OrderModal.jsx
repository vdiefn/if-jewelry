import { useContext, useEffect, useState } from "react"
import axios from "axios"

function OrderModal(){

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
            <button type='button' className='btn-close' aria-label='Close' />
          </div>
          <div className='modal-body'>
            <div className='mb-2'>
              <label className='w-80' htmlFor='email'>
                Email
                <input
                  type='email'
                  id='email'
                  placeholder='請輸入Email'
                  name='email'
                  className='form-control mt-1'
                />
              </label>
            </div>  
            <div className='mb-2'>
              <label className='w-80' htmlFor='name'>
                訂購者
                <input
                  type='text'
                  id='name'
                  placeholder='請輸入訂購人姓名'
                  name='name'
                  className='form-control mt-1'
                />
              </label>
            </div>
            <div className='mb-2'>
              <label className='w-80' htmlFor='address'>
                外送地址
                <input
                  type='text'
                  id='address'
                  placeholder='請輸入地址'
                  name='address'
                  className='form-control mt-1'
                />
              </label>
            </div>
            <div className='mb-2'>
              <label className='w-100' htmlFor='message'>
                留言
                <textarea
                  type='text'
                  id='message'
                  placeholder='快快到貨!'
                  name='message'
                  className='form-control mt-1'
                />
              </label>
            </div>
            
            <label className='form-check-label' htmlFor='is_enabled'>
              <input
                className='form-check-input me-2'
                type='checkbox'
                id='is_enabled'
                name='is_enabled'
              />
              是否啟用
            </label>
          </div>
          <div className='modal-footer'>
            <button type='button' className='btn btn-secondary'>
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