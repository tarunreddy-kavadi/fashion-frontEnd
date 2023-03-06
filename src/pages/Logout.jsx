import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../redux/userRedux'
import { emptyCart } from '../redux/cartRedux'
import { useState, useEffect } from 'react'
import { ToastContainer,ToastText } from '../components/ToastElements'

function Logout() {
    const dispatch = useDispatch()
    // const handleClick =(e)=>{
    //     e.preventDefault()
    dispatch(logout());
    dispatch(emptyCart())
    //}
    // let fail = (error ? error : "Done")
    const [ toast, setToast ] = useState({
      text:'Worng User or Password Credentials....',
      status: true,
      bg: 'red'
  })
  useEffect(()=>{
      let myTimeout;
      if(toast.status) {
           myTimeout = setTimeout(()=>{
              setToast({
                  ...toast,
                  status:false,
              });
          }, 1000)
      }
      return ()=> clearTimeout(myTimeout)
  },[toast])
    
  return (
    <div>
      { <ToastContainer bg= {toast.bg}>
                <ToastText>{toast.text}</ToastText>
                </ToastContainer>}
      {/* <button onClick={handleClick} disabled = {isFetching}>LOGOUT</button>
      {fail}  */}
    </div>
  )
}

export default Logout
