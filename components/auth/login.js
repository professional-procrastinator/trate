import GoogleLogin from "react-google-login"


export default function Login({setUser,setAuthError}){


    const signIn = async (profile) =>{
        const response = await fetch('/api/auth/login',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization':profile.getAuthResponse().id_token
            }
        })

        if(response.status===400){
            setAuthError(response.status)
        }else{
            const data = await response.json();
            return setUser(data.details)
            
        }
        
    }
    
    return(
        <>
            <h2 style={{color:'var(--primary-color)'}}>Trate</h2>
            <GoogleLogin
                clientId={process.env.GOOGLE_CLIENT_ID}
                
                theme='dark'
                onSuccess={signIn}
                onFailure={signIn}

                
                isSignedIn={true}
            />
        </>
    )
}