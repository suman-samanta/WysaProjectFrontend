import React, { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "../../commons/Header";
import { timePickerInput } from 'analogue-time-picker'




const baseUrl =require("../../config/default");


export default function Home(){

  const {user}=useContext(Context);
  const [timeLength, setTimeLength] = useState(null);
  const[timeSelected,setTimeSelected]=useState(false);
  const[timeForSleepSelected,setTimeForSleepSelected]=useState(false);
  const [timeForGetupSelected,setTimeForGetupSelcted]=useState(false);
  const [sleepTimeSpan,setSleepTimeSpan]=useState();
  const timeForGetupref=useRef();
  const timeForSleepref=useRef();
  const handleGoalCheck=()=>{
    setTimeSelected(true);
  }


 useEffect(()=>{
  if(timeForSleepref.current&&timeForGetupref.current===undefined){
    timePickerInput({
      inputElement: timeForSleepref.current,
      mode: 12,
      time: new Date()
    });
  }

  
 })

 useEffect(()=>{
  if(timeForGetupref.current&&timeForSleepref.current){
    timePickerInput({
      inputElement: timeForGetupref.current,
      mode: 12,
      time: new Date()
    });
  }
 })

 const handleSubmit=async(e)=>{
  console.log(timeLength);
  console.log(timeForGetupref.current.value);
  console.log(timeForSleepref.current.value);
  console.log(sleepTimeSpan)
  e.preventDefault();
  try{
   const result=await axios.post(`${baseUrl}/NewSleepRoutine`,{
    userId:user._id,
    timeLength:timeLength,
    timeForSleep:timeForSleepref.current.value,
    timeForGetup:timeForGetupref.current.value,
    sleepTimeSpan:sleepTimeSpan
   }).then((res)=>{
    toast.success("Successfully Created your Sleep Feature");

   }).catch(err=>{
    toast.error(err.response.data);
    
   })
  }catch(err){
    console.log(err);
    toast.error(err.response.data);
  }
 }

  return(
    <>
    <Header/>
    <ToastContainer/>
    {
      (timeLength===null ||timeSelected===false)&&
    
    <div className="firstpage">
        <div className="question">That's a great goal. How long have you been struggling with your sleep?</div>
    <div className="options">
        <div  className={timeLength === 'lessThan2' ? 'option selected' : 'option'} 
        onClick={() => setTimeLength('lessThan2')}>
            <span>Less than 2 weeks</span>
            <span className="checkmark">✔</span>
        </div>
        <div className={timeLength === 'twoToSix' ? 'option selected' : 'option'} 
        onClick={() => setTimeLength('twoToSix')}>
            <span>2 to 6 weeks</span>
            <span className="checkmark">✔</span>
        </div>
        <div className={timeLength === 'moreThan6' ? 'option selected' : 'option'} 
         onClick={() => setTimeLength('moreThan6')}>
            <span>More than 6 weeks</span>
            <span className="checkmark">✔</span>
        </div>
    </div>
    <button className="next-button" onClick={handleGoalCheck}>↓</button>
    
    </div>
    }
    { (timeLength!==null && timeSelected!==false)&&


      <div class="firstpage">
      <div className="question">What time do you go to bed for sleep?</div>
   <div class="options">
   <div className="option">
   <input ref={timeForSleepref} type="text"/>
   <div id="change-time" className="change-time" >
  {'>'}
 
  </div>
   </div>

       
  </div>
     
      <button class="next-button" onClick={()=>setTimeForSleepSelected(true)}>↓</button>
     
   
          </div>
    
 
   
    }

    {
      (timeForSleepSelected&& (timeForSleepref.current!==null))&&
      <div class="firstpage">
      <div className="question">What time do you get out of the bed to start your day</div>
   <div class="options">
   <div className="option">
   <input className="inputTime" ref={timeForGetupref} type="text"/>
   <div id="change-time" className="change-time" >
  {'>'}
 
  </div>
   </div>

       
  </div>
     
      <button class="next-button" onClick={()=>setTimeForGetupSelcted(true)}>↓</button>
     
   
          </div>
    }
      { timeForGetupSelected &&

        <div className="firstpage">
        <div className="question"> Ok. How many hours sleep do you get in a typical night?</div>
   
       <div className="houroptions">
        <div className={sleepTimeSpan==="5 hrs"?"houroption selected":"houroption"}>
          <hr className={sleepTimeSpan==="5 hrs"?"line selected":"line"} />
          <p className={sleepTimeSpan==="5 hrs"?"text selected":"text"} 
          onClick={()=>setSleepTimeSpan("5 hrs")}>5 hrs</p>
        </div>
        <div className={sleepTimeSpan==="6 hrs"?"houroption selected":"houroption"}>
          <hr className={sleepTimeSpan==="6 hrs"?"line selected":"line"} />
          <p className={sleepTimeSpan==="6 hrs"?"text selected":"text"} 
           onClick={()=>setSleepTimeSpan("6 hrs")}>6 hrs</p>
        </div>
        <div className={sleepTimeSpan==="7 hrs"?"houroption selected":"houroption"}>
          <hr className={sleepTimeSpan==="7 hrs"?"line selected":"line"} />
          <p className={sleepTimeSpan==="7 hrs"?"text selected":"text"} 
           onClick={()=>setSleepTimeSpan("7 hrs")}>7 hrs</p>
        </div>

        <div className={sleepTimeSpan==="8 hrs"?"houroption selected":"houroption"}>
          <hr className={sleepTimeSpan==="8 hrs"?"line selected":"line"} />
          <p className={sleepTimeSpan==="8 hrs"?"text selected":"text"} 
           onClick={()=>setSleepTimeSpan("8 hrs")}>8 hrs</p>
        </div>
      </div> 

      <button class="next-button" onClick={handleSubmit}>↓</button>

    </div>
      }
    
    </>
  )
}