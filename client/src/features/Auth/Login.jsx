import React, { useState } from 'react'
import './Login.css'
import createToast from '../../utility/toastify.js'
import { useLoginMutation } from '../../app/apiSlice.js'
import { validateEmail, validatePhone } from '../../utility/validate.js'
import { setCredentials } from './AuthSlice.js'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
    // use login mutation
    const [login, {data: loginData, isSuccess : loginSuccess, isError : loginError, error: errorMsg} ] = useLoginMutation()

    // use navigate
    const navigate = useNavigate()

    // use dispatch
    const dispatch = useDispatch()
    // use State
    const [input, setInput] = useState({
        user : "",
        password : ""
    })
    // handle input
    const handleInput =(e) => {
        setInput((prev) => ({
            ...prev,
            [e.target.name] : e.target.value
        }))        
    }
    // handle form
    const handleForm = (e) => {
        e.preventDefault()
        try {
            if (!input.user || !input.password) {
                createToast("err", "All feilds are required");
            }else if (validateEmail(input.user)) {
               login({email : input.user, password : input.password})
                if (loginSuccess) {
                    dispatch(setCredentials({
                        user : loginData.user,
                        token : loginData.token
                    }))
                    setInput({
                        user : "",
                        password : ""
                    })                   
                    createToast("suc", "Login successful")
                    navigate('/')
                }
                if (loginError) {
                    createToast("err", errorMsg.data.message);
                }             
                
            }else if (validatePhone(input.user)) {
               login({phone : input.user, password : input.password})
                if (loginSuccess) {
                    dispatch(setCredentials({
                        user : loginData.user,
                        token : loginData.token
                    }))
                    setInput({
                        user : "",
                        password : ""
                    })                   
                    createToast("suc", "Login successful")

                    navigate('/')
                }
                if (loginError) {
                    createToast("err", errorMsg.data.message);
                }    
            }else {
                createToast("Enter your valid email or phone number")
            }
        } catch (error) {
            console.log(error.message)            
        }
    }
    
  return (
    <>
    {/* <div className="container">

        <div className="left">
            <h1>facebook</h1>
            <p>Facebook helps you connect and share with the people in your life.</p>
        </div>

        <div className="login-box">
            <form onSubmit={handleForm}>
                <input value={input.user} type="text" name='user' onChange={handleInput} placeholder="Email address or phone number"/>
                <input value={input.password} name='password' onChange={handleInput} type="password" placeholder="Password"/>

                <button type='submit' className="login-btn">Log In</button>

                <a href="#" className="forgot">Forgotten password?</a>

                <hr/>

                <Link to='/register' className="create-btn">Create New Account</Link>
            </form>
        </div>
    </div> */}
        <div class="container">

        {/* <!-- LEFT SIDE --> */}
        <div class="left">
            <div className="left-content">
                <div class="logo">f</div>

                <h1>
                Explore the things <br />
                <span>you love.</span>
                </h1>
            </div>

            {/* <!-- Image collage placeholder --> */}
            <div class="image-box">
            <img src="https://static.xx.fbcdn.net/rsrc.php/yb/r/HpEiFYDux5j.webp" alt="preview" />
            </div>
        </div>

        {/* <!-- RIGHT SIDE --> */}
        <div class="right">
            <div class="login-box">

            <div class="top">
                <span class="back">←</span>
                <h2>Log in to Facebook</h2>
            </div>

            <form onSubmit={handleForm}>
                <input name='user' onChange={handleInput} type="text" placeholder="Email address or mobile number" />
                <input name='password' onChange={handleInput} type="password" placeholder="Password" />
                <button type='submit' class="login-btn">Log in</button>
            </form>

            <p class="forgot">Forgotten password?</p>

            <Link to="/register"><button class="create-btn">Create new account</button></Link>

            </div>
        </div>

        </div>

        {/* <!-- Footer --> */}
        <div class="footer">
        <p>
            English (UK) · বাংলা · हिन्दी · العربية · More languages...
        </p>
        <p>
            Sign up · Log in · Messenger · Privacy · Terms · Help
        </p>
        <p>Meta © 2026</p>
        </div>

    </>
  )
}

export default Login
