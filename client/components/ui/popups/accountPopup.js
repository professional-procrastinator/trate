import {useEffect,useRef} from 'react';
import {GoogleLogout} from 'react-google-login';
import styles from "../../../styles/popups/accountPopup.module.css";
import homeStyles from '../../../styles/home/home.module.css';

export default function AccountPopup({setOpen,setLogoutOpen,profileUsername}){
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

    const logout = () => {
        setLogoutOpen(true);
        setOpen(false);
    }

    return(
        <div className={styles.popupParent}>
            <div className={styles.popupDIV} ref={ref}>
                <div className={`${styles.popupLinkDiv} ${styles.homePopupLinkDiv}`} onClick={()=>{window.location.href=`/`}}>
                    <div className={styles.homeIcon}></div>
                    <p className={homeStyles.linkText}>Home</p>
                    <div className={styles.homeDivArrow}></div>
                </div>
                <div className={`${styles.popupLinkDiv} ${styles.profilePopupLinkDiv}`} onClick={()=>{window.location.href=`/profile/${profileUsername}`}}>
                    <div className={styles.profileIcon}></div>
                    <p className={homeStyles.linkText}>Profile</p>
                    <div className={styles.profileDivArrow}></div>
                </div>
                <div className={`${styles.popupLinkDiv} ${styles.settingsPopupLinkDiv}`}>
                    <div className={styles.settingsIcon}></div>
                    <p className={homeStyles.linkText}>Settings</p>
                    <div className={styles.settingsDivArrow}></div>
                </div>
                
                <div className={`${styles.popupLinkDiv} ${styles.settingsPopupLinkDiv}`}>
                    <div className={styles.languageIcon}></div>
                    <p className={homeStyles.linkText}>Language</p>
                    <div className={styles.settingsDivArrow}></div>
                </div>
                
                <div className={`${styles.popupLinkDiv} ${styles.settingsPopupLinkDiv}`}>
                    <div className={styles.bugIcon}></div>
                    <p className={homeStyles.linkText}>Report a bug</p>
                    <div className={styles.settingsDivArrow}></div>
                </div>
                <div className={styles.logoutSeparator}></div>

                <div className={styles.logoutDivMain} onClick={()=>{logout()}}>
                    <div className={styles.logoutIcon}></div>
                        
                    <p className={homeStyles.dangerText}>Logout</p>
                </div>
            </div>
        </div>
    )
}