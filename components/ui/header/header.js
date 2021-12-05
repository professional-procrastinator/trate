import {useState} from 'react'
import styles from '../../../styles/home/homeHeader.module.css'

import AccountPopup from '../popups/accountPopup'
import LogoutPopup from '../popups/logoutPopup'

export default function Header({profile}){
    const [isProfilePopupOpen,setIsProfilePopupOpen] = useState(false)
    const [isLogoutPopupOpen,setIsLogoutPopupOpen] = useState(false)
    return(
        <>
        <div className={styles.header}>
            <h2 className={styles.logo}>Trate</h2>
            <img className={styles.pfp} src={profile.image} onClick={()=>{setIsProfilePopupOpen(!isProfilePopupOpen)}} />
        </div>
        {isProfilePopupOpen?<AccountPopup setOpen={setIsProfilePopupOpen} setLogoutOpen={setIsLogoutPopupOpen}/>:null}
        {isLogoutPopupOpen?<LogoutPopup setOpen={setIsLogoutPopupOpen}/>:null}
        </>
    )
}