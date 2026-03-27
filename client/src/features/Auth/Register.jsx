import React from 'react'
import './Register.css'
import { useCreateUserMutation } from '../../app/apiSlice'
import { useState } from 'react'
import moment from 'moment'
import createToast from '../../utility/toastify'
import { Link, useNavigate } from 'react-router-dom'
import { validateEmail, validatePhone } from '../../../../api/utility/validate'

const Register = () => {
    // use mutation 
    const [createUser, {data, isLoading, isSuccess, isError, error}] = useCreateUserMutation()

    // use navigate
    const navigate = useNavigate()

    // use state
    const [input, setInput] = useState({
        frist_name : "",
        sur_name : "",
        user : "",
        password : "",
        day : "",
        month : "",
        year : "",
        gender : ""
    })

    // handle input 
    const handleInput = (e) => {
        setInput((prev)=>({
            ...prev,
            [e.target.name] : e.target.value
        }))        
    }

    const input_day = moment(`${input.year}-${input.month}`, "YYYY-MM").daysInMonth();
    //get array day
    const generateRecentDay = (input_day) => {
        const day = Array.from({length : input_day}, (_, index) => 1 + index)
        return day
    }
    const recentDay = generateRecentDay(input_day)
    

    // get array year
    const generateRecentYears = (count) => {
    const currentYear = new Date().getFullYear(); // e.g., 2026
    const years = Array.from({ length: count }, (_, index) => currentYear - index);
    return years;
    };

    const recentYears = generateRecentYears(50);
    // month array
    const monthNamesShort = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    // handle form submit
    const handleFormSubmit = async (e) => {
        e.preventDefault()
        if (!input.frist_name || !input.sur_name || !input.user || !input.password || !input.day || !input.month || !input.year || !input.gender) {
            createToast("err", "All fields are required!")
        } else if (validateEmail(input.user)) {
            try {
                await createUser({
                    frist_name : input.frist_name,
                    sur_name : input.sur_name,
                    email : input.user,
                    password : input.password,
                    gender : input.gender,
                    brith_date : input.month +'/'+ input.day +'/'+ input.year
                }).unwrap()  

                setInput({
                    frist_name : "",
                    sur_name : "",
                    user : "",
                    password : ""
                })
                createToast("suc", "Account created successful")
                
                e.target.reset()
            } catch (error) {
               console.log(error)                
            }            
        } else if (validatePhone(input.user)) {
            try {
                await createUser({
                    frist_name : input.frist_name,
                    sur_name : input.sur_name,
                    phone : input.user,
                    password : input.password,
                    gender : input.gender,
                    brith_date : input.month +'/'+ input.day +'/'+ input.year
                }).unwrap()  

                setInput({
                    frist_name : "",
                    sur_name : "",
                    user : "",
                    password : ""
                })

                createToast("suc", "Account created successful")
                
                e.target.reset()
            } catch (error) {
               console.log(error)                
            }        
        }
    }

    if (error) {
        createToast("err", error.data.message)
    }
    if (isSuccess) {
        createToast("suc", data.message)
        console.log(data.user._id)
        navigate(`/account/verify/${data.user._id}`)
    }

  return (
    <>
        <div className='register'>
            <div className="register-wrapper">

            {/* <!-- Top --> */}
            <div className="top">
            <Link to="/login" className="back">←</Link>
            <div className="logo">Meta</div>
            </div>

            {/* <!-- Form --> */}
            <form onSubmit={handleFormSubmit} className="form-container">
            <h1>Get started on Facebook</h1>
            <p className="desc">
                Create an account to connect with friends, family and communities.
            </p>

            {/* <!-- Name --> */}
            <label>Name</label>
            <div className="row">
                <input name='frist_name' value={input.frist_name} onChange={handleInput} type="text" placeholder="First name" />
                <input name='sur_name' value={input.sur_name} onChange={handleInput} type="text" placeholder="Surname" />
            </div>

            {/* <!-- DOB --> */}
            <label>Date of birth</label>
            <div className="row">
                <select name='day' onChange={handleInput}>
                    <option>Day</option>
                    {
                        recentDay && recentDay.map(item => (
                            <option value={item} key={item}>
                                {item}
                            </option>
                        ))
                    }
                </select>
                <select name='month' onChange={handleInput}>
                    <option>Month</option>
                    {
                        monthNamesShort && monthNamesShort.map(item => (
                            <option value={item} key={item}>
                                {item}
                            </option>
                        ))
                    }           
                </select>
                <select name='year' onChange={handleInput}>
                    <option>Year</option>
                    {
                        recentYears && recentYears.map(item => (
                            <option value={item} key={item}>
                                {item}
                            </option>
                        ))
                    }
                </select>
            </div>

            {/* <!-- Gender --> */}
            <label>Gender</label>
            <select onChange={handleInput} name='gender'>
                <option selected>Select your gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Custom">Custom</option>
            </select>

            {/* <!-- Contact --> */}
            <label>Mobile number or email address</label>
            <input type="text" name='user' onChange={handleInput} placeholder="Mobile number or email address" />

            <p className="small">
                You may receive notifications from us.
            </p>

            {/* <!-- Password --> */}
            <label>Password</label>
            <input name="password" onChange={handleInput} type="password" placeholder="Password" />

            <p className="terms">
                By tapping Submit, you agree to Facebook's Terms, Privacy Policy and Cookies Policy.
            </p>

            <button type='submit' className="submit">Submit</button>
            <br />
            <Link to="login"><button className="secondary">I already have an account</button></Link>
        

            </form>

        </div>
        </div>
    </>
  )
}

export default Register
