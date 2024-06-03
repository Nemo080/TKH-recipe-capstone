import { useState } from "react";
import "/src/index.css";
import { Link } from "react-router-dom";
import axios from 'axios'
// import { useNavigate } from "react-router-dom";
function Signup() {

    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    // const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post("http://localhost:3000/auth/signup", { name, email, password })
        .then(result => {console.log(result)
        // navigate("/login")
        })
        .catch(err => console.log(err))
    }


  
  return (
    <>
      <div className="signup-container">
        <h2 className="signup-header">Create your account</h2>
        <div className="signup-content">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email">
                        <strong>Name</strong>
                    </label>
                    <br></br>
                    <input type="text" 
                    placeholder='Enter Name' 
                    autoComplete='off' 
                    name='email' 
                    className='form-control rounded-0'
                    onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email">
                        <strong>Email</strong>
                    </label>
                    <br></br>
                    <input type="text" 
                    placeholder='Enter Email' 
                    autoComplete='off' 
                    name='email' 
                    className='form-control rounded-0' 
                    onChange={(e) => setEmail(e.target.value)}

                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email">
                        <strong>Password</strong>
                    </label>
                    <br></br>
                    <input type="password" 
                    placeholder='Enter Password' 
                    name='password' 
                    className='form-control rounded-0' 
                    onChange={(e) => setPassword(e.target.value)}

                    />
                </div>
                <p className="signup-p">Already have an account?
                <Link to="/login" className="signup-login"> Log in
                </Link></p>
                <button type="submit" className="btn btn-success w-100 rounded-0">
                    Sign Up
                </button>
                </form>
                </div>
    </div>
    </>
  )
}

export default Signup