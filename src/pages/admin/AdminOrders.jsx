import { useRef, useEffect, useState } from "react"
import { Modal } from 'bootstrap'
import axios from "axios"
import OrderModal from "../../components/OrderModal"
import DeleteModal from "../../components/DeleteModal"
import Pagination from "../../components/Pagination"


function AdminOrders(){
  const [orders, setOrders] = useState([])
  const [pagination, setPagination ] = useState({})
  const [tempOrder, setTempOrder] = useState({})
  
  const orderModal = useRef(null)
  const deleteModal = useRef(null)
  
  useEffect(() => {
    orderModal.current = new Modal('#orderModal', {
      backdrop: 'static'
    });
    deleteModal.current = new Modal('#deleteModal', {
      backdrop: 'static'
    })
    getOrders()
  }, [])

  

  const getOrders = async (page=1) => {
    const orderRes = await axios.get(`/v2/api/${import.meta.env.VITE_API_PATH}/admin/orders?page=${page}`)
    setOrders(orderRes.data.orders)
    setPagination(orderRes.data.pagination)
  }
 

  const openModal = (order) => {
    setTempOrder(order)
    orderModal.current.show()
  }
  const closeOrderModal = () => {
    orderModal.current.hide()
  }

  const openDeleteModal = (order) => {
    setTempOrder(order)
    deleteModal.current.show()
  }

  const closeDeleteModal = () => {
    deleteModal.current.hide()
  }

  const deleteOrder = async (id) => {
    try {
      const res = await axios.delete(`/v2/api/${import.meta.env.VITE_API_PATH}/admin/order/${id}`)
      console.log(res)
      if (res.data.success) {
        getOrders()
        deleteModal.current.hide()
      }

    } catch (error) {
      console.log(error)
    }
  }
  
  return (<div className="p-3">
    <OrderModal 
      closeOrderModal={closeOrderModal} 
      getOrders={getOrders}
      tempOrder={tempOrder} 
    />
    <DeleteModal 
      close={closeDeleteModal} 
      text={tempOrder.id} 
      handleDelete={deleteOrder} 
      id={tempOrder.id}
    />
    <h3>訂單列表</h3>
    <hr />
    <table className="table">
      <thead>
        <tr>
          <th scope="col">訂單編號</th>
          <th scope="col">訂單日期</th>
          <th scope="col">購買用戶</th>
          <th scope="col">訂單金額</th>
          <th scope="col">付款狀態</th>
          <th scope="col">訂單內容</th>
        </tr>
      </thead>
      <tbody>
        {
          orders.map((order) => {
            return(
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{new Date(order.create_at*1000).toDateString()}</td>
                <td>{order.user.name}</td>
                <td>{order.total}</td>
                <td>{order.is_paid? '已付款': '未付款'}</td>
                <td>
                  <button 
                    type="button" 
                    className="btn btn-primary btn-sm" 
                    onClick={()=> openModal(order)}
                  >
                    明細
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-outline-danger btn-sm ms-2" 
                    onClick={()=>openDeleteModal(order)}
                  >
                    刪除
                  </button>
                </td>
              </tr>
            )
          })
        }
        
      </tbody>
    </table>

    <nav aria-label='Page navigation example' className='d-flex justify-content-center mt-5'>
      <Pagination pagination={pagination} changePage={getOrders}/>
    </nav>

  </div>)

}

export default AdminOrders