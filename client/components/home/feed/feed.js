import { useState } from 'react';
import styles from '../../../styles/home/feed/feed.module.css';
import PostCard from './postCard';
import NewPostPopup from './modals/newPost';

import DeletePost from './modals/deletePost/deletePost';
export default function Feed({userId,feed,socket}){
    const [isNewPostPopupOpen,setIsNewPostPopupOpen] = useState(false);
    
    const closeNewPostPopup = ()=>{
        setIsNewPostPopupOpen(false);
    }
    const newPost = async (ref,post) =>{
        //post.body = ref.current.editor.root.innerHTML.replaceAll('<p><br></p>','');

        socket.emit('new-post',post);

        socket.on('post',(data)=>{
            if(data.id===post.id){

                return setIsNewPostPopupOpen(false);
            }
        })
    }
    
    return(
        <>

        <div className={styles.feedContainer}>
            <div className={styles.feedHeading}>
                <h2>Feed</h2>
                
                <div onClick={()=>{setIsNewPostPopupOpen(true)}} className={styles.newPostButton}>
                    <div className={styles.newPostButtonIcon}></div>
                    <div className={styles.newPostButtonText}>New</div>
                </div>
            </div>
            <div className={styles.feedBody}>
                <div className={styles.feedBodyList}>
                    {feed.map((item, index) => {
                        return <PostCard userId={userId} key={index} item={item} socket={socket}/>
                    })}
                </div>
                {isNewPostPopupOpen?<NewPostPopup newPost={newPost} closeModal={closeNewPostPopup}/>:null}
            </div>
        </div>

    </>
    )
}