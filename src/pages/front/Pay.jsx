import { Link, useNavigate, useOutletContext, useParams} from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { Input, Select } from '../../components/FormElements'
import axios from 'axios'

function Pay() {
  const { cartData } = useOutletContext()
  console.log(cartData)
  const navigate = useNavigate()
  const { orderId } = useParams()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onTouch'
  })

  const onSubmit = async() => {
    const res = await axios.post(`/v2/api/${import.meta.env.VITE_API_PATH}/pay/${orderId}`)
    console.log(res)
    navigate(`/success/${orderId}`)
  }
  return(<>
    <div className="row justify-content-center">
      <div className="col-md-10">
        <h3 className="fw-bold mb-4 pt-3">填寫付款資料</h3>
      </div>
    </div>
    <div className="row flex-row-reverse justify-content-center pb-5">
      <div className="col-md-4">
        <div className="border p-4 mb-4">
          {
            cartData?.carts?.map((item) => {
              return (<div className="d-flex mb-2" key={item.id}>
                <img src={item.product.imageUrl} alt="" className="me-2" style={{ width: '48px', height: '48px', objectFit: 'cover' }} />
                <div className="w-100">
                  <div className="d-flex justify-content-between">
                    <p className="mb-0 fw-bold">{item.product.title}</p>
                    <p className="mb-0">NT${item.total}</p>
                  </div>
                  <p className="mb-0 fw-bold">x{item.qty}</p>
                </div>
              </div>

              )
            })
          }
          
          <table className="table mt-4 border-top border-bottom text-muted">
            <tbody>
              <tr>
                <th scope="row" className="border-0 px-0 pt-4 font-weight-normal">小計</th>
                <td className="text-end border-0 px-0 pt-4">NT${cartData?.final_total}</td>
              </tr>
              <tr>
                <th scope="row" className="border-0 px-0 pt-0 pb-4 font-weight-normal">付款方式</th>
                <td className="text-end border-0 px-0 pt-0 pb-4">信用卡一次付清</td>
              </tr>
            </tbody>
          </table>
          <div className="d-flex justify-content-between mt-4">
            <p className="mb-0 h4 fw-bold">總金額</p>
            <p className="mb-0 h4 fw-bold">NT${cartData?.final_total}</p>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className="accordion" id="accordionExample">
          <div className="card rounded-0">
            <div className="card-header bg-white border-0 py-3" id="headingOne" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                <p className="mb-0 position-relative custom-checkout-label fw-bold">付款方式：信用卡一次付清</p>
            </div>
            <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
              <div className="card-body bg-light ps-5 py-4">
                <div className="mb-2">
                    <label htmlFor="Lorem ipsum1" className="text-muted mb-0 shadow-none">信用卡卡號</label>
                    <input type="text" className="form-control" id="Lorem ipsum1" placeholder="請輸入卡號" />
                </div>
                <div className="mb-2">
                    <label htmlFor="Lorem ipsum1" className="text-muted mb-0">有效日期</label>
                    <input type="text" className="form-control" id="Lorem ipsum1" placeholder="MM/YY" />
                </div>
                <div className="mb-0">
                    <label htmlFor="Lorem ipsum2" className="text-muted mb-0">安全碼</label>
                    <input type="text" className="form-control" id="Lorem ipsum2" placeholder="CVC" />
                </div>
              </div>
            </div>
          </div>
          <div className="card rounded-0">
            <div className="card-header bg-white border-0 py-3 collapsed" id="headingThree" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="true" aria-controls="collapseThree">
                <p className="mb-0 position-relative custom-checkout-labe fw-bold">發票資訊</p>
            </div>
            <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
              <div className="form-check card-body bg-light ps-5 py-4">
                 <div className='mb-2'>
                    <input type="radio" className="form-check-input me-3 radio-color" name='receipt' id="Lorem ipsum1" placeholder="Lorem ipsum" />
                    <label htmlFor="Lorem ipsum1" className="form-check-label mb-0 ">紙本發票</label>
                 </div>
                <div className='mb-2'>
                  <input type="radio" className="form-check-input me-3" name='receipt' id="Lorem ipsum2" placeholder="Lorem ipsum" />
                  <label htmlFor="Lorem ipsum2" className="form-check-label mb-0">公司發票</label>
                </div>
                <div className='mb-2'>
                  <input type="radio" className="form-check-input me-3" name='receipt' id="Lorem ipsum3" placeholder="Lorem ipsum" />
                  <label htmlFor="Lorem ipsum3" className="form-check-label mb-0">捐贈發票</label>  
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex flex-column-reverse flex-md-row mt-4 justify-content-between align-items-md-center align-items-end w-100">
          <Link to='/checkout' className="btn btn-dark mt-md-0 mt-3"><i className="fas fa-chevron-left me-2"></i> 回上一頁</Link>
          <button
            type='submit'
            className='btn btn-dark mt-md-0 mt-3'
          >
            確認付款
          </button>
        </div>
        </form>
      </div>
    </div>
  </>
  )
}


export default Pay