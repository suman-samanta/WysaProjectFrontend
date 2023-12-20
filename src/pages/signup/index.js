import axios from "axios";
import { useNavigate} from 'react-router-dom';
import React, { useContext, useRef, useState } from "react";
import { Context } from "../../context/Context";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../../commons/Loader/index";

const baseUrl=require("../../config/default");


const SignUp = () => {

    const navigate = useNavigate();
    const [propType,setPropType]=useState("");
    const [signUpfailure,setSignUpfailure]=useState("");
    const [emailFailure,setEmailFailure]=useState("");
    const [loading, setLoading] = useState(false);

    const [email,setEmail]=useState();
    const [password,setPassword]=useState();
    const [passwordCheck,setPasswordCheck]=useState();

    const navigateHome = () => {
        navigate('/');
      };

    const {dispatch,isFetching}=useContext(Context)
   
    const handleSubmit= async (e)=>{
        setLoading(true);
        e.preventDefault();
        dispatch({type:"LOGIN_START"});

        try{

            const validEmailcheck=await axios.get(`https://emailvalidation.abstractapi.com/v1/?api_key=97932b2cdb154061b6989d7655d96f73&email=${email}`);

            console.log(validEmailcheck);

            if(validEmailcheck.data.deliverability==="DELIVERABLE"){
                const res=await axios.post(`${baseUrl}/auth/register`,{
                    email:email,
                    password:password,
                    passwordCheck:passwordCheck
                }).then(
                    toast.success("User Created")
                ).catch(err=>{
                    console.log(err);
                    toast.error(err.data);
                })
                console.log(res.data);
              
    
                try{
                    if(res.data){
                    dispatch({type:"LOGIN_SUCCESS",payload:res.data});
                    setSignUpfailure(false); 
                    setLoading(false);
                    navigateHome();
                }
    
                }catch(err){
                   setSignUpfailure(true); 
                    dispatch({type:"LOGIN_FAILURE"});
                   setLoading(false);
                }
            }else{
                setEmailFailure(true); 
                    dispatch({type:"LOGIN_FAILURE"});
                   setLoading(false);
            }
        }catch(err){
            setSignUpfailure(true);
            dispatch({type:"LOGIN_FAILURE"});
           setLoading(false);
        }

    }

    return (
        <>
        <ToastContainer />
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
                                            <span className="d-none d-lg-block">Signup with Gmail</span>
                                        </a>
                                    </div>

                               

                                <div className="card mb-3">

                                    <div className="card-body">

                                        <div className="pt-4 pb-2">
                                            <h5 className="card-title text-center pb-0 fs-4"> Create a New Account</h5>
                                            <p className="text-center small inputauth">Enter your Email & password to Signup</p>
                                        </div>

                                        <form className="row g-3 needs-validation" novalidate>
                                        

                                            <div className="col-12">
                                                <label for="yourUsername" className="form-label inputauth">User Email</label>
                                                <div className="input-group has-validation">
                                                    {/* <span className="input-group-text" id="inputGroupPrepend">@</span> */}
                                                    <input type="text" name="username" className="form-control" id="loginUsername"  onChange={e=>setEmail(e.target.value)} required />
                                                    <div className="invalid-feedback">Please enter your username.</div>
                                                </div>
                                            </div>

                                            <div className="col-12">
                                                <label for="yourPassword" className="form-label inputauth">Password</label>
                                                <input type="password" name="password" className="form-control" id="loginPassword" onChange={e=>setPassword(e.target.value)}  required />
                                                <div className="invalid-feedback">Please enter your password!</div>
                                            </div>

                                            <div className="col-12">
                                                <label for="yourPassword" className="form-label inputauth"> Confirm Password</label>
                                                <input type="password" name="password" className="form-control" id="loginPassword" onChange={e=>setPasswordCheck(e.target.value)} required />
                                                <div className="invalid-feedback">Please enter your password Again!</div>
                                            </div>
                                            <div className="col-12">
                                                <button className="btn btn-primary w-100" type="submit" onClick={e=>handleSubmit(e)} >Login</button>
                                            </div>

                                            <div className="col-12">
                                                <p className="small mb-0 inputauth">Already have account? <a href="/login" >Click Here to SignUp</a></p>
                                            </div>
                                        </form>

 
                                    </div>
                                </div>
                                {signUpfailure?<label for="yourPassword" className="form-label color-red ">Please use proper credentials.</label>:null}
                                
                                {emailFailure?<label for="yourUsername" className="form-label color-red ">Please use Vaild Email Id</label>:null}
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

export default SignUp;