import {useEffect,useRef} from 'react'
import styles from './deletePost.module.css';

import { toast } from 'react-toastify';
export default function DeletePost({item,setOpen,deletePost}){
    let ref = useRef(null);
    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setOpen(false);
        }
    }
    const delPost = async () => {
        deletePost().then(()=>{

            setOpen(false);
            toast.success('Your post has been deleted.', {
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
        });
    }
    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
          document.removeEventListener('click', handleClickOutside, true);
        };
    });
    return(
        <div className={styles.popupBackground}>
            <div className={styles.popup} ref={ref}>
                
            <div className={styles.popupTopRow}>
                    <p className={styles.popupTopRowText}>Post</p>
                </div>

                <div className={styles.popupSeparator}/>

                <div className={styles.popupContent}>
                    <p>Are you sure you want to delete your post?</p>
                </div>

                <div className={styles.popupBottomRow}>
                    <a className={styles.popupActionCancel} onClick={()=>{setOpen(false)}}>Cancel</a>
                    <button onClick={()=>{delPost()}} className={`${styles.popupActionButton} ${styles.popupActionNegative}`}>Delete</button>
                </div>
            </div>
        </div>
    )
}
