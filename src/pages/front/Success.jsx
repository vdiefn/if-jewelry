import { Link, useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

function Success() {
  const { orderId } = useParams()
  const [ orderData, setOrderData ] = useState({})
  const navigate = useNavigate()

  const getCart = async(orderId) => {
    const res = await axios.get(
      `/v2/api/${import.meta.env.VITE_API_PATH}/order/${orderId}`,
    )
    setOrderData(res.data.order)
  }

  useEffect(() => {
    getCart(orderId)
  }, [orderId])

  const handleClick = () => {
    navigate('/')
    location.reload()
  }

  return( <>
    <div className="position-relative d-flex">
      <div className="container d-flex flex-column" style={{minHeight: '100vh'}}>
        <div className="row my-auto pb-7">
          <div className="col-md-5 d-flex flex-column">
            <div className="my-auto">
              <div className='mb-3'><h2> 購買成功</h2></div>

              <p>感謝您對&nbsp;「如果·If Jwewlry」&nbsp;的支持！希望您會喜歡收到的商品😊</p>
              <p>如有任何問題，請不吝隨時與我們聯繫，期待您的再次光臨！</p>

              <div className='col-md-12'>
                <div className='card rounded-0 py-4'>
                  <div className='card-header border-bottom-0 bg-white px-4 py-0'>
                    <h5>購物明細</h5>
                  </div>
                  <div className='card-body px-4 py-0'>
                    <ul className='list-group list-group-flush'>
                      {
                        Object.values(orderData?.products || {}).map((item) => {
                          return (<li className='list-group-item px-0' key={item.id}>
                            <div className='d-flex mt-2'>
                              <img
                                src={item.product.imageUrl}
                                alt=''
                                className='me-2 object-fit'
                                style={{ width: '60px', height: '60px' }}
                              />
                              <div className='w-100 d-flex flex-column'>
                                <div className='d-flex justify-content-between fw-bold'>
                                  <h5>{item.product.title}</h5>
                                  <p className='mb-0'>x{item.qty}</p>
                                </div>
                                <div className='d-flex justify-content-end mt-auto'>
                                  <p className='mb-0'>NT${item.total}</p>
                                </div>
                              </div>
                            </div>
                          </li>
                          )
                        })
                      }
                      <li className='list-group-item px-0 pb-0'>
                        <div className='d-flex justify-content-between mt-2'>
                          <p className='mb-0 h5 fw-bold'>總金額</p>
                          <p className='mb-0 h5 fw-bold'>NT${orderData?.total}</p>
                        </div>
                      </li>
                      
                    </ul>
                  </div>
                </div>
              </div>


              <button type='button' className="btn btn-dark mt-4 px-5" onClick={handleClick} >回到首頁</button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-md-50 w-50 position-absolute opacity-1" style={{
        zIndex: '-1', minHeight: '100vh', right: '0', backgroundImage: 'url(https://images.unsplash.com/photo-1696290685415-518ce48e6da0?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)', backgroundPosition: 'top center',
        }}>
      </div>
    </div>
  </>
  )
}

export default Success