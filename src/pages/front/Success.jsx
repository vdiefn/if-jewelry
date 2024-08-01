import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

function Success() {
  const { orderId } = useParams()
  console.log('success:', orderId)
  const [ orderData, setOrderData ] = useState({})
  const getCart = async(orderId) => {
    const res = await axios.get(
      `/v2/api/${import.meta.env.VITE_API_PATH}/order/${orderId}`,
    )

    console.log('success:', res)
    setOrderData(res.data.order)
  }

  useEffect(() => {
    getCart(orderId)
  }, [orderId])

  return( <>
    <div className="position-relative d-flex">
      <div className="container d-flex flex-column" style={{minHeight: '100vh'}}>
        <div className="row my-auto pb-7">
          <div className="col-md-5 d-flex flex-column">
            <div className="my-auto">
              <h2>購買成功</h2>
              <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod</p>

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


              <Link to='/' className="btn btn-dark mt-4 px-5">回到首頁</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="w-md-50 w-50 position-absolute opacity-1" style={{zIndex: '-1', minHeight: '100vh', right: '0', backgroundImage: 'url(https://images.unsplash.com/photo-1480399129128-2066acb5009e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80)',
      backgroundPosition: 'center center'}}>
      </div>
    </div>
  </>
  )
}

export default Success