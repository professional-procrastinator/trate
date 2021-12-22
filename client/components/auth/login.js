import GoogleLogin from "react-google-login"
import {signIn, signOut} from "next-auth/client"

export default function Login(){


    return(
        <>
            <h2 style={{color:'var(--primary-color)'}}>Trate</h2>
            <button onClick={()=>{signIn()}}>Sign up</button>
        </>
    )
}