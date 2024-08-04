import { Link, useOutletContext, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { Input, TextArea } from '../../components/FormElements'


function Checkout(){
  const { cartData } = useOutletContext()
  console.log(cartData)

  
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onTouch'
  })


  const onSubmit = async(data) => {
    const { name, email, tel, address} = data
    const form = {
      data: {
        user: {
          name,
          email,
          tel,
          address
        }
      },
      message: data.message
    }
    const res = await axios.post(`/v2/api/${import.meta.env.VITE_API_PATH}/order`, form)
    console.log(res)
    navigate(`/pay/${res.data.orderId}`)
  }

  return (<>
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <h3 className="fw-bold mb-4 pt-3">訂單明細確認</h3>
        </div>
      </div>
      <div className="row flex-row-reverse justify-content-center pb-5">
        <div className="col-md-4">
          <div className="border p-4 mb-4">
            {
              cartData?.carts?.map((item) => {
                return (<div className="d-flex mb-2" key={item.id}>
                  <img src={item.product.imageUrl} alt="" className="me-2 object-fit" style={{ width: '48px', height: '48px', objectFit: 'cover' }} />
                  <div className="w-100">
                    <div className="d-flex justify-content-between">
                      <p className="mb-0 fw-bold">{item.product.title}</p>
                      <p className="mb-0">NT${item.final_total}</p>
                    </div>
                    <p className="mb-0 fw-bold">x&nbsp;{item.qty}</p>
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
            <p>購買人資訊</p>
            <div className="mb-2">
              <Input
                id='email'
                labelText='電子信箱'
                errors={errors}
                register={register}
                rules={{
                  required: 'Email 為必填',
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'Email 格式不正確',
                  },
                }}
              ></Input>
            </div>
            <div className="mb-2">
              <Input
                id='name'
                type='text'
                errors={errors}
                labelText='收件人姓名'
                register={register}
                rules={{
                  required: '收件人姓名為必填',
                  maxLength: {
                    value: 10,
                    message: '收件人姓名長度不超過 10',
                  },
                }}
              ></Input>
            </div>
            <div className="mb-2">
              <Input
                id='tel'
                type='number'
                errors={errors}
                labelText='連絡電話'
                register={register}
                rules={{
                  required: '連絡電話為必填',
                  minLength: {
                    value: 6,
                    message: '連絡電話號碼長度不小於6碼',
                  },
                  maxLength: {
                    value: 20,
                    message: '連絡電話號碼長度不大於20碼',
                  },
                }}
              ></Input>
            </div>
            <div className="mb-2">
              <Input
                id='address'
                type='text'
                errors={errors}
                labelText='地址'
                register={register}
                rules={{
                  required: '地址為必填',
                }}
              ></Input>
            </div> 
            <div className="mb-2">
              <TextArea
                errors={errors}
                register={register}
                labelText='留言'
                id='message'
                rules={{
                  required: {
                    value: false,
                    message: '請留下評論'
                  }
                }}
                defaultValue=''
              />
            </div>
            <div className="d-flex flex-column-reverse flex-md-row mt-4 justify-content-between align-items-md-center align-items-end w-100">
              <Link to='/cart' className="btn btn-dark mt-md-0 mt-3">回上一頁</Link>
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
    </div>
  
  </>
  )
}

export default Checkout