import {useState,useEffect} from 'react';
import {signIn,useSession} from 'next-auth/client'
import styles from '../../../styles/home/homeHeader.module.css'
import AccountPopup from '../popups/accountPopup'
import LogoutPopup from '../popups/logoutPopup'


export default function Header(){
    const [isProfilePopupOpen,setIsProfilePopupOpen] = useState(false)
    const [isLogoutPopupOpen,setIsLogoutPopupOpen] = useState(false)
    const [profileUsername,setProfileUsername] = useState('')
    const [session,loading] = useSession();

    useEffect(async ()=>{
        if(session){
            const response = await fetch(`/api/me`,{
                method:'GET',
                headers:{
                    'Content-Type':'application/json'
                }
            })
            const data = await response.json();
            setProfileUsername(data.user.username)
        }
    },[])

    
    if(session){
        return(
            <>

            <div className={styles.header}>
                <h2 className={styles.logo}>Trate</h2>
                <img className={styles.pfp} src={session.user.image} onClick={()=>{setIsProfilePopupOpen(!isProfilePopupOpen)}} />
            </div>

            {isProfilePopupOpen?<AccountPopup setOpen={setIsProfilePopupOpen} setLogoutOpen={setIsLogoutPopupOpen} profileUsername={profileUsername}/>:null}
            {isLogoutPopupOpen?<LogoutPopup setOpen={setIsLogoutPopupOpen}/>:null}

            </>
        )
    }else{
        return(
            
            <div className={styles.header}>
                <h2 className={styles.logo}>Trate</h2>
                <button className={styles.loginButton} onClick={()=>{signIn('google')}}>Login</button>
            </div>
        )
    }
}