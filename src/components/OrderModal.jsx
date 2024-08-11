import { useContext, useEffect, useState} from "react"

import axios from "axios"

import { MessageContext, handleErrorMessage, handleSuccessMessage } from "../store/messageStore"

function OrderModal({ closeOrderModal, getOrders, tempOrder }){
  const [tempData, setTempData] = useState({
    ...tempOrder,
    is_paid: '',
  })

  const [message, dispatch] = useContext(MessageContext)

  useEffect(() => {
    setTempData({
      ...tempOrder,
      is_paid: tempOrder.is_paid,
    })
  }, [tempOrder])

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (['is_paid'].includes(name)) {
      setTempData((pre) => ({ ...pre, [name]: e.target.checked }));
    } else {
      setTempData((pre) => ({ ...pre, [name]: value }));
    }
  };

  const submit = async () => {
    try {
      const res = await axios.put(`/v2/api/${import.meta.env.VITE_API_PATH}/admin/order/${tempOrder.id}`, {
        data: {
          ...tempData
        }
      })
      handleSuccessMessage(dispatch, res)
      closeOrderModal()
      getOrders()
    } catch (error) {
      console.log(error)
      handleErrorMessage(dispatch, error)
    }
  }


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
                  value={tempOrder?.user?.name || ''}
                  onChange={handleChange}
                  disabled
                />
              </label>
            </div> 
            <div className='form-group mb-2 col-md-7'>
              <label className='w-100' htmlFor='email'>
                  電子信箱
                <input
                  type='email'
                  id='email'
                  name='email'
                  placeholder=''
                  className='form-control mt-1'
                    value={tempOrder?.user?.email || ''}
                  onChange={handleChange}
                  disabled
                />
              </label>
            </div>
            
            <div className='form-group mb-2 col-md-6'>
              <label className='w-100' htmlFor='address'>
                地址
                <input
                  type='text'
                  id='address'
                  name='address'
                  placeholder=''
                  className='form-control mt-1'
                    value={tempOrder?.user?.address || ''}
                  onChange={handleChange}
                  disabled
                />
              </label>
            </div>
              <div className='form-group mb-3 col-md-6'>
                <label className='w-100' htmlFor='tel'>
                  電話
                  <input
                    type='number'
                    id='tel'
                    name='tel'
                    placeholder=''
                    className='form-control mt-1'
                    value={tempOrder?.user?.tel || ''}
                    onChange={handleChange}
                    disabled
                  />
                </label>
            </div> 
              <div className='form-group mb-3 col-md-8'>
                <label className='w-100' htmlFor='message'>
                  留言
                  <textarea
                    type='text'
                    id='message'
                    name='message'
                    placeholder=''
                    cols='6'
                    rows='3'
                    className='form-control mt-1'
                    value={tempOrder?.message || ''}
                    onChange={handleChange}
                    disabled
                  />
                </label>
              </div> 
          </div> 
            <div className='row'>

              {
                Object.values(tempOrder.products || {}).map((item) => {
                  return (<div className='row'key={item.id}>
                    <div className='form-group mb-2 col-md-10' >
                      <label className='w-100' htmlFor='productName'>
                  品項名稱
                      <input
                        type='text'
                        id='productName'
                        name='productName'
                        placeholder=''
                        className='d-flex form-control mt-1'
                        defaultValue={item.product.title}
                        disabled
                      />
                      </label>
                  </div>
                    <div className='col-md-2 mb-1 text-end'>
                    <label className='w-100' htmlFor='qty'>
                      數量
                    <input
                      type='number'
                      id='qty'
                      name='qty'
                      placeholder=''
                      className='form-control mt-1 text-end'
                      defaultValue={item.qty}
                      disabled
                    />
                    </label>
                  </div>
                </div>
                  )
                })
              }

              <div className='form-group mb-2 col-md-10 d-flex justify-content-end mt-1'>
                總金額
              </div>
              <div className='form-group mb-2 col-md-2 d-flex justify-content-between mt-1'>
                NTD${tempOrder.total }
              </div>
            </div>
            <hr/>
            <h5>付款狀態</h5>
              <input
                type='checkbox'
                id='is_paid'
                name='is_paid'
                placeholder=''
                className='form-check-input me-2'
                onChange={handleChange}
                checked={!!tempData.is_paid} //!!Boolean(tempData.is_enabled)
              />
            <span className='ml-2 '>
              {tempData.is_paid ? '已付款' : '未付款'}
            </span>
          </div>
          <div className='modal-footer'>
            
            <button type='button' className='btn btn-secondary' onClick={closeOrderModal}>
              關閉
            </button>
            <button type='button' className='btn btn-primary' onClick={submit}>
              儲存
            </button>
          </div>
        </div>
      </div>
    </div>
  )
    
}

export default OrderModal