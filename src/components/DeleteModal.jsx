function DeleteModal({close, text, handleDelete, id}) {
  
  return (
    <div
      className='modal fade'
      tabIndex='-1'
      aria-labelledby='exampleModalLabel'
      aria-hidden='true'
      id='deleteModal'
    >
      <div className='modal-dialog'>
        <div className='modal-content'>
          <div className='modal-header bg-danger'>
            <h1 className='modal-title text-white fs-5' id='deleteModal'>
              刪除確認
            </h1>
            <button
              type='button'
              className='btn-close'
              aria-label='Close'
              onClick={close}
            />
          </div>
          <div className='modal-body'>確定要刪除 {text} 嗎？</div>
          <div className='modal-footer'>
            <button type='button' className='btn btn-secondary' onClick={close}>
              取消
            </button>
            <button type='button' className='btn btn-danger' onClick={() => handleDelete(id)}>
              確認刪除
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;