import { useState } from "react";

import Login from '../components/auth/login';
import Header from '../components/ui/header/header';

import styles from '../styles/home/home.module.css'

export default function App() {
  const [user, setUser] = useState(null);
  const [error,setAuthError] = useState(null);
  if(user===null){
    return (
      <Login setUser={setUser} setAuthError={setAuthError}/>
    )  
  }else{
    return(
      
      <div className={styles.home}>
        <Header profile={user} />
      </div>
    )
  }
}
