import { useState,useEffect } from "react";

import Login from '../components/auth/login';
import { useSession } from "next-auth/client";


import Home from '../components/home/home';

export default function App() {
  const [session,loading] = useSession();

  if(!session){
    return (
      <Login/>
    )  
  }else{
    return(
      <Home />
    )
  }
}
