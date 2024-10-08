import { useOutletContext, Link } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect, useContext } from 'react'
import { MessageContext, handleErrorMessage, handleSuccessMessage } from "../../store/messageStore"

function Cart() {
  const { cartData, getCart, getCost, getCoupon , couponData, setCouponData} = useOutletContext()
  // const [couponData, setCouponData] = useState('')
  // const [getCost, setGetCost] =  useState({})
  const [loadingItems, setLoadingItem ] = useState([])
  const [message, dispatch] = useContext(MessageContext)

  const [orderData, setOrderData] = useState({})
  

 

  const removeCartItem = async(id) => {
    try {
      const res = await axios.delete(`/v2/api/${import.meta.env.VITE_API_PATH}/cart/${id}`)
      getCart()
    } catch(error){
      console.log(error)
    }
  }

  const updateCartItem = async (item, quantity) => {
    const data = {
      data: {
        product_id: item.product_id,
        qty: quantity
      }
    }
    setLoadingItem([...loadingItems, item.id])
    try {
      const res = await axios.put(`/v2/api/${import.meta.env.VITE_API_PATH}/cart/${item.id}`, data)
      setLoadingItem(loadingItems.filter((loadingObject) => loadingObject !== item.id ))
      getCart()
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }

  // const getCoupon = async() => {
  //   const data = {
  //     data: {
  //       code: couponData
  //   }}
  //   try{
  //     const res = await axios.post(`/v2/api/${import.meta.env.VITE_API_PATH}/coupon`, data)
  //     setGetCost(res.data)
  //     // setGetCard((pre) => ({ ...pre, final_total: getCost.data.final_total }))
  //     // setTempData((pre) => ({ ...pre, [name]: e.target.checked }))
  //     // cartData.final_total
  
  //     console.log(res)
  //     handleSuccessMessage(dispatch, res)
  //   } catch(error){
  //     console.log(error)
  //     handleErrorMessage(dispatch, error)
  //   }
  // }

  const handleChange = (e) => {
    setCouponData(e.target.value)
  };




  return (<>
    <div className="container full-height">
      <div className="mt-3 me-5 ms-5">
        <h3 className="mt-3 mb-4">購物車</h3>
        

        {
          (cartData?.carts?.length === 0) || (cartData?.carts?.length === undefined)  ? 
      
            (
                <>
                  <div className='alert alert-light mt-5'>還沒有將你喜愛的飾品加入購物車喔！</div>
                  <Link
                    to='/products'
                    className='btn btn-dark border-bottom border-top-0 border-start-0 border-end-0 rounded-0 mt-5'
                  >
                    回到產品列表 
                  </Link>
                
                </>
            ):
            (
        
        <div className="row">
          <div className="col-md-8">
            <table className="table">
               <thead>
                <tr>
                  <th scope="col" className="border-0 ps-0">產品資訊</th>
                  <th scope="col" className="border-0">數量</th>
                  <th scope="col" className="border-0">小計</th>
                  <th scope="col" className="border-0"></th> 
                </tr>
              </thead>
            <tbody>
                {
                      cartData?.carts?.map((item) => {
                        return (<tr className="border-bottom border-top" key={item.id}>
                          <th scope="row" className="border-0 px-0 font-weight-normal py-4">
                            <img src={item.product.imageUrl} alt="" className="object-cover" style={{ width: '72px', height: '72px', objectFit: 'cover' }} />
                            <p className="mb-0 fw-bold ms-3 d-inline-block">{item.product.title}</p>
                          </th>
                          <td className="border-0 align-middle" style={{ maxWidth: '160px' }}>
                            <div className="input-group pe-5">
                              <div className="input-group-prepend">
                              </div>
                              <select
                                name="quantity"
                                className='form-select'
                                id='quantity'
                                value={item.qty}
                                disabled={loadingItems.includes(item.id)}
                                onChange={(e) => { updateCartItem(item, e.target.value * 1) }}>
                                {
                                  [...(new Array(20))].map((i, num) => {
                                    return (
                                      <option value={num + 1} key={num}>{num + 1}</option>
                                    )
                                  })
                                }
                              </select>

                              <div className="input-group-append">
                              </div>
                            </div>
                          </td>
                          <td className="border-0 align-middle"><p className="mb-0 ms-auto">NT${item.final_total}</p></td>
                          <td className="border-0 align-middle">
                            <button
                              type='button'
                              className='btn'
                              onClick={() => { removeCartItem(item.id) }}>
                              <i className="bi bi-x-lg"></i>
                            </button>
                          </td>
                        </tr>

                        )
                      })
                }
              </tbody>
            </table>
           
                
                  <div className="input-group w-100 mb-3">
                    <input
                      type="text"
                      className="form-control rounded-0 border-bottom border-top-0 border-start-0 border-end-0 shadow-none" placeholder="優惠券號碼"
                      aria-label="Recipient's username"
                      aria-describedby="button-addon2"
                      onChange={handleChange}
                      value={couponData}
                    />
                    <button
                      className="btn btn-dark border-bottom border-top-0 border-start-0 border-end-0 rounded-0"
                      type="button"
                      id="button-addon2"
                      onClick={() => getCoupon()}>
                      加入優惠券
                    </button>
            </div>
          </div>


                <div className="col-md-4">
                  <div className="border p-4 mb-4">
                    <h4 className="fw-bold mb-4">訂單資訊</h4>
                    <table className="table text-muted border-bottom">
                      <tbody>
                        <tr>
                          <th scope="row" className="border-0 px-0 pt-4 font-weight-normal">金額</th>
                          <td className="text-end border-0 px-0 pt-4">NT${cartData?.final_total || ''}</td>
                        </tr>
                        <tr>
                          <th scope="row" className="border-0 px-0 pt-0 pb-4 font-weight-normal">付款方式</th>
                          <td className="text-end border-0 px-0 pt-0 pb-4">信用卡一次付清</td>
                        </tr>
                        <tr>
                          <th scope="row" className="border-0 px-0 pt-0 pb-4 font-weight-normal">使用優惠券</th>
                          <td className="text-end border-0 px-0 pt-0 pb-4">{getCost.success ? '是' : '否'}</td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="d-flex justify-content-between mt-4">
                      <p> { getCost.success? '折扣後金額' : '總金額'}
                      </p>
                      {/* <p className="mb-0 h5 fw-bold">NT${couponData.length === 0 ? cartData?.final_total : getCost?.data?.final_total}</p> */}
                      <p className="mb-0 h5 fw-bold">
                        {getCost.success ? `NT$${getCost?.data?.final_total}` : `NT$${cartData?.final_total}`}
                      </p>

                    </div>
                    <Link to='/checkout' className="btn btn-dark w-100 mt-4">進行結帳</Link>
                  </div>
          </div>


        </div>


        )}
        

      </div>
    </div>
  </>)
}

export default Cart