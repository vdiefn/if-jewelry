import { useRef, useEffect } from "react"
import { Modal } from 'bootstrap'
import OrderModal from "../../components/OrderModal"


function AdminOrders(){
  const orderModal = useRef(null)
  useEffect(() => {
    orderModal.current = new Modal('#orderModal')
    orderModal.current.show()
  })

  const openModal = () => {
    orderModal.current.show()
  }
  
  return (<div className="p-3">
    <OrderModal />
    <h3>訂單列表</h3>
    <hr />
    <table className="table">
      <thead>
        <tr>
          <th scope="col">訂單編號</th>
          <th scope="col">購買用戶</th>
          <th scope="col">訂單金額</th>
          <th scope="col">付款狀態</th>
          <th scope="col">付款日期</th>
          <th scope="col">留言訊息</th>
          <th scope="col">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr >
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td>
            <button type="button"  className="btn btn-primary btn-sm" onClick={openModal}>
              編輯
            </button>
            <button type="button"className="btn btn-outline-danger btn-sm ms-2">
              刪除
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <nav aria-label='Page navigation example'>
      <ul className='pagination'>
        <li className='page-item'>
          <a className='page-link disabled' href='/' aria-label='Previous'>
            <span aria-hidden='true'>&laquo;</span>
          </a>
        </li>
        {[...new Array(5)].map((_, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <li className='page-item' key={`${i}_page`}>
            <a className={`page-link ${i + 1 === 1 && 'active'}`} href='/'>
              {i + 1}
            </a>
          </li>
        ))}
        <li className='page-item'>
          <a className='page-link' href='/' aria-label='Next'>
            <span aria-hidden='true'>&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>

  </div>)

}

export default AdminOrders