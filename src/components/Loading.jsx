import ReactLoading from 'react-loading'

function Loading({isLoading}){
  return ( <>
    {
      isLoading && (
        <div className='react-loading'>
          <ReactLoading type='bubbles' color='white' height={60} width={100} />
        </div>
      )
    }
  </>
  )
}

export default Loading