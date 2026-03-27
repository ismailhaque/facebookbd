import React, { useState } from 'react'
import './verify.css'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useSendCodeMutation, useVerifyAccountMutation } from '../../app/apiSlice'
import createToast from '../../utility/toastify'


const Verify = () => {
    // use params
    const {id} = useParams()
    
    // use mutation
    const [verifyAccount, {data, isSuccess, error}] = useVerifyAccountMutation()
    const [sendCode, {data : resendCodeData, isSuccess : resendCodeSuccess, error: resendCodeError}] = useSendCodeMutation()
    // use query
    // use state
    const [code, setCode] = useState('')

    // use navigate
    const navigate = useNavigate()

    // handle submit
    const HandleSubmit = async(e) => { 
        e.preventDefault()       
        await verifyAccount({code : code, id})
    }
    const resend = async () => {
        await sendCode(id)
    }
    if (resendCodeSuccess) {
        createToast("suc", resendCodeData.message)
    }
    // handle input 
    const handleInput = (e) => {
        setCode(e.target.value)
    }
    if (error) {
        createToast("err", error.data.message)
    }
    if (isSuccess) {
        createToast("suc", data.message)
        navigate('/login')
    }
   return (
    <>
      <div className="container-verify">

        <div className="verify-box">

            {/* <!-- Header --> */}
            <div className="header">
            <Link to='/login'><span className="back">←</span></Link>
            <h2>Enter security code</h2>
            </div>

            {/* <!-- Info --> */}
            <p className="info">
            Please check your messages for a code. Your code is 6 numbers long.
            </p>
            <form onSubmit={HandleSubmit}>
                <input name='code' value={code} onChange={handleInput} type="text" placeholder="Enter code" />

                {/* <!-- Actions --> */}
                <button type='submit' className="confirm-btn">Continue</button>
            </form>

            <p onClick={resend} className="resend">Resend code</p>

            <p className="change">
            Not you? <span>Change email or phone number</span>
            </p>

        </div>

    </div>
    </>
  )
}

export default Verify
