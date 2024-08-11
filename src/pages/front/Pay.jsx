import { Link, useNavigate, useOutletContext, useParams} from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { Input, Select, CheckboxRadio } from '../../components/FormElements'
import axios from 'axios'

function Pay() {
  const { cartData } = useOutletContext()
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
                <div className="mb-4">
                    <Input
                      id='creditCard'
                      labelText='信用卡卡號'
                      errors={errors}
                      register={register}
                      type='number'
                      rules={{
                        required: '信用卡卡號為必填',
                        minLength: {
                          value: 16,
                          message: '信用卡卡號長度為16碼',
                        },
                        maxLength: {
                          value: 16,
                          message: '信用卡卡號長度為16碼',
                        }, 
                      }}
                    ></Input>
    
                </div>
                  <div className='row rol-cols-2'>
                    <h6>信用卡有效期限</h6>
                    <div className="col-6 mb-4">
                    <Select
                      id='month'
                      labelText=''
                      errors={errors}
                      register={register}
                      rules={{
                        required: '信用卡到期月份為必填',
                      }}
                    >
                      <option value=''>請選擇月份</option>
                      <option value='1' >01</option>
                      <option value='2' >02</option>
                      <option value='3' >03</option>
                      <option value='4' >04</option>
                      <option value='5' >05</option>
                      <option value='6' >06</option>
                      <option value='7' >07</option>
                      <option value='8' >08</option>
                      <option value='9' >09</option>
                      <option value='10' >10</option>
                      <option value='11' >11</option>
                      <option value='12' >12</option>                      
                    </Select>
                    </div>
                    <div className="col-6 mb-2">  
                      <Select
                        id='year'
                        labelText=''
                        errors={errors}
                        register={register}
                        rules={{
                          required: '信用卡到期年份為必填'
                        }}
                      >
                        <option value=''>請選擇年份</option>
                        {
                          [...(new Array(14))].map((i, num) => {
                            return (
                              <option value={num + 17} key={num}>{num + 17}</option>
                            )
                          })
                        }

                      </Select>
                    </div>    
                </div>
                <div className="mb-0">
                    <Input
                      id='CVC'
                      labelText='安全碼'
                      errors={errors}
                      type='number'
                      register={register}
                      rules={{
                        required: '安全碼為必填',
                        minLength: {
                          value: 3,
                          message: '請輸入卡片背後安全碼，共3碼',
                        },
                        maxLength: {
                          value: 3,
                          message: '請輸入卡片背後安全碼，共3碼',
                        },
                      }}
                    ></Input>
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
                    <CheckboxRadio
                      type='radio'
                      name='isVegetarian'
                      id='vegetarian'
                      value={true}
                      register={register}
                      errors={errors}
                      rules={{ required: '請選擇發票提供方式' }}
                    labelText="紙本發票"
                    ></CheckboxRadio>
                  <CheckboxRadio
                    type='radio'
                    name='isVegetarian'
                    id='vegetarian'
                    value={true}
                    register={register}
                    errors={errors}
                    rules={{ required: '請選擇發票提供方式' }}
                    labelText="公司發票"
                  ></CheckboxRadio>
                    <CheckboxRadio
                      type='radio'
                      name='isVegetarian'
                      id='non-vegetaria'
                      value={false}
                      register={register}
                      errors={errors}
                    rules={{ required: '請選擇發票提供方式' }}
                    labelText="捐贈發票"
                    ></CheckboxRadio>
                  
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