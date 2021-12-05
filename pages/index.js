import { useState } from "react";

import Login from '../components/auth/login';
import Home from './home/home'


export default function App() {
  const [user, setUser] = useState(null);
  const [error,setAuthError] = useState(null);
  if(user===null){
    return (
      <Login setUser={setUser} setAuthError={setAuthError}/>
    )  
  }else{
    return(
      <Home profile={user} />
    )
  }
}
