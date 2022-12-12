import { useState, useEffect } from "react"
import {FaSignInAlt} from 'react-icons/fa'
import {useNavigate} from "react-router-dom"
import {toast} from 'react-toastify'
import Spinner from "../components/Spinner/Spinner"


// Redux
import {useSelector, useDispatch} from 'react-redux'
import { login, reset } from "../features/auth/authSlice"


const Login = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    

    const {user, isLoading, isError, isSuccess, message} = useSelector(
        (state) => state.auth
      )

      useEffect(() => {
        if(isError){
            toast.error(message)
        }
    
        if(isSuccess || user){
            navigate('/')
        }
    
        dispatch(reset())
        
      }, [user, isError, isSuccess, message, navigate, dispatch])

    const [formData, setFormData] = useState({
        email: '',
        password: '',
      })
    
      const {email, password} = formData
    
      const onChange = (e) => {
        setFormData(prevState => ({
            ...prevState,
            [e.target.name] : e.target.value
        }))
      }
    
      const onSubmit = (e) => {
        e.preventDefault()
        dispatch(login(formData))
      }

      if(isLoading){
        return <Spinner/>
      }
      
      return (
        <>
            <section className="heading">
                <h1>
                    <FaSignInAlt /> Login
                </h1>
                <p>Login and start setting goals</p>
            </section>
    
            <section className="form">
                <form onSubmit={onSubmit}>
                    
                    <div className="form-group">
                        <input type="email" className="form-control" id='email' name='email' value={email} placeholder='Enter your email' onChange={onChange}/>
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" id='password' name='password' value={password} placeholder='Enter a password' onChange={onChange}/>
                    </div>
            
                    <div className="form-group">
                        <button type='submit' className='btn btn-block'>Submit</button>
                    </div>
                </form>
            </section>
        </>
      )
}

export default Login