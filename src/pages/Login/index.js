import axios from "axios";
import { useNavigate} from 'react-router-dom';
import React, { useContext, useRef, useState } from "react";
import { Context } from "../../context/Context";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../../commons/Loader/index";
const baseUrl=require("../../config/default");



const Login = () => {

    const navigate = useNavigate();
    const [loginfailure,setLoginFailure]=useState("");
    const [loading, setLoading] = useState(false);

    const [email,setEmail]=useState();
    const [password,setPassword]=useState();

    const navigateHome = () => {
      
        navigate('/');
      
      };

    const {dispatch,isFetching}=useContext(Context)
   
    const handleSubmit= async (e)=>{
        setLoading(true);
        e.preventDefault();
        dispatch({type:"LOGIN_START"});

        try{

            // console.log(passwordRef.current.value)

            const res=await axios.post(`${baseUrl}/auth/login`,{
                email:email,
                password:password
            }).catch(err=>{
                console.log(err);
                toast.error(err.response.data);
            })

          

            try{
                if(res.data.token){
                dispatch({type:"LOGIN_SUCCESS",payload:res.data});         
                setLoginFailure(false); 
                setLoading(false);
                navigateHome();
            }

            }catch(err){
               setLoginFailure(true); 
                dispatch({type:"LOGIN_FAILURE"});
               setLoading(false);
            }

            
        }catch(err){
            setLoginFailure(true);
            dispatch({type:"LOGIN_FAILURE"});
           setLoading(false);
        }

    }

    return (
        <>
       
        {loading ? (
        <Loader/>
      ) :(
           
            <div className="container">

                <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                               
                                    <div className="d-flex justify-content-center py-4">
                                        <a className="logo d-flex align-items-center w-auto">
                                            <span className="d-none d-lg-block">Gmail Login</span>
                                        </a>
                                    </div>

                               

                                <div className="card mb-3">

                                    <div className="card-body">

                                        <div className="pt-4 pb-2">
                                            <h5 className="card-title text-center pb-0 fs-4">Login to Your Account</h5>
                                            <p className="text-center small inputauth">Enter your Email & password to login</p>
                                        </div>

                                        <form className="row g-3 needs-validation" novalidate>
                                        

                                            <div className="col-12">
                                                <label for="yourUsername" className="form-label inputauth">Username</label>
                                                <div className="input-group has-validation">
                                                    {/* <span className="input-group-text" id="inputGroupPrepend">@</span> */}
                                                    <input type="text" name="username" className="form-control" id="loginUsername" onChange={e=>setEmail(e.target.value)} required />
                                                    <div className="invalid-feedback ">Please enter your username.</div>
                                                </div>
                                            </div>

                                            <div className="col-12">
                                                <label for="yourPassword" className="form-label inputauth">Password</label>
                                                <input type="password" name="password" className="form-control" id="loginPassword" onChange={e=>setPassword(e.target.value)} required />
                                                <div className="invalid-feedback">Please enter your password!</div>
                                            </div>

                                            {/* <div className="col-12">
                                                <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" name="remember" value="true" id="rememberMe" />
                                                    <label className="form-check-label" for="rememberMe">Remember me</label>
                                                </div>
                                            </div> */}
                                            <div className="col-12">
                                                <button className="btn btn-primary w-100" type="submit" onClick={e=>handleSubmit(e)} >Login</button>
                                            </div>

                                            <div className="col-12">
                                                <p className="small mb-0 inputauth">Don't have account? <a href="/signup" >Click Here to Create an Account</a></p>
                                            </div>
                                        </form>

 
                                    </div>
                                </div>
                                {loginfailure?<label for="yourPassword" className="form-label color-red ">Invalid credentials. Please use proper credentials.</label>:null}
                                

                                {/* <div className="credits">
          Designed by <a href="https://">l</a>
        </div> */}

                            </div>
                        </div>
                    </div>

                </section>

            </div>
     )} 
        </>
    )
}

export default Login;