import { Routes, Route } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from "./context/Context";
import Home from './pages/home/index';
import Login from './pages/Login/index';
import Signup from './pages/signup/index';
// import Demo from './pages/demo/Demo';
function App() {
  const { user } = useContext(Context);
  return (
   
  <>

   
   <Routes>
    <Route path='/' element={user ? <Home/>:<Login/>} />
    <Route path='/login' element={user?<Home/>:<Login/>}/>
    <Route path='/signup' element={user?<Home/>:<Signup/>}/>

   </Routes>

   </>
   
  );
}

export default App;
