import {useRef,useEffect} from 'react';
import {signOut} from 'next-auth/client';
import styles from "../../../styles/popups/logoutPopup.module.css";

export default function LogoutPopup({setOpen}) {
    let ref = useRef(null);
    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setOpen(false);
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
          document.removeEventListener('click', handleClickOutside, true);
        };
    });

    const logout = async () => {
        await signOut();
        window.location.reload();
        
    }
    return (
        <div className={styles.popupBackground}>
            <div ref={ref} className={styles.logoutPopup}>

                <div className={styles.popupTopRow}>
                    <p className={styles.popupTopRowText}>Account</p>
                </div>

                <div className={styles.popupSeparator}/>

                <div className={styles.popupContent}>
                    <p>Are you sure you want to log out?</p>
                </div>

                <div className={styles.popupBottomRow}>
                    <a className={styles.popupActionCancel} onClick={()=>{setOpen(false)}}>Cancel</a>
                    <button onClick={()=>{logout()}} className={`${styles.popupActionButton} ${styles.popupActionNegative}`}>Logout</button>
                </div>
            </div>
        </div>
    )
}