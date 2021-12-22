import {useState,useRef,useEffect} from 'react';
import styles from './postOverlay.module.css';



import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DeletePost from '../feed/modals/deletePost/deletePost';

export default function PostOverlay({userId,item,open,share,link,report,setIsDeletePopupOpen}) {
    let ref = useRef(null);

    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            open(false);
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
          document.removeEventListener('click', handleClickOutside, true);
        };
    });

    const copyPostLink = () => {
        navigator.clipboard.writeText("localhost:3000"+link);
        toast.success('Copied the post link!', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme:'dark',
            closeButton: false
        });
        open(false)
    }

    const DelPost = () => {
        
        setIsDeletePopupOpen(true)
        open(false);
    }
    return(
        <>
        <div className={styles.popupOverlayDiv} ref={ref}>
            <div className={styles.overlayOption} id={styles.overlayOpen} onClick={()=>{window.open(link, '_blank');}}>
                <p className={styles.overlayOptionText}>Open</p>
                <div className={styles.overlayOptionIcon} id={styles.overlayOpenIcon}></div>
            </div>
            
            <div className={styles.overlayOption} id={styles.overlayShare}>
                <p className={styles.overlayOptionText}>Share</p>
                <div className={styles.overlayOptionIcon} id={styles.overlayShareIcon}></div>
            </div>
            
            <div className={styles.overlayOption} id={styles.overlayCopy} onClick={copyPostLink}>
                <p className={styles.overlayOptionText}>Copy Link</p>
                <div className={styles.overlayOptionIcon} id={styles.overlayCopyIcon}></div>
            </div>
            
            {userId!=item.user._id?(<div className={styles.overlayOption} id={styles.overlayReport} style={{'border-bottom-left-radius':'var(--popup-border-radius)','border-bottom-right-radius':'var(--popup-border-radius)'}}>
                <p className={styles.overlayOptionText} id={styles.overlayReportText}>Report</p>
                <div className={styles.overlayOptionIcon} id={styles.overlayReportIcon}></div>
            </div>):(<></>)}
            
            {userId==item.user._id?(<div className={styles.overlayOption} id={styles.overlayDelete} onClick={DelPost}>
                <p className={styles.overlayOptionText} id={styles.overlayDeleteText}>Delete</p>
                <div className={styles.overlayOptionIcon} id={styles.overlayDeleteIcon}></div>
            </div>):(<></>)}

            
        </div>
        
        </>
    )
}

/*

<ToastContainer
position="bottom-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
/>
*/