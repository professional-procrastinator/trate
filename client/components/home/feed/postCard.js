import styles from './stylesheets/postCard.module.css';
import {weekdayShort,monthShort} from '../../../global/dates/dates';
import { useState,useEffect } from 'react';
import useRouter from 'next/router'

import PostOverlay from '../global/postOverlay';
import DeletePost from './modals/deletePost/deletePost';
export default function PostCard({userId,index,item,socket}) {
    const [postDate,setPostDate] = useState(null);
    const [isOverlayOpen,setOverlayOpen] = useState(false);
    const [isDeletePopupOpen,setIsDeletePopupOpen] = useState(false);

    useEffect(()=>{
        if(item.createdAt===undefined){
            setPostDate(`${weekdayShort[new Date().getDay()]}, ${monthShort[new Date().getMonth()]} ${new Date().getDate()} ${new Date().getFullYear()}`);
        }else{
            setPostDate(`${weekdayShort[new Date(item.createdAt).getDay()]}, ${monthShort[new Date(item.createdAt).getMonth()]} ${new Date(item.createdAt).getDate()} ${new Date(item.createdAt).getFullYear()}`);
            
        }
    },[])
    
    const deletePost = async () =>{

        socket.emit('delete-post',item._id)
        return 'success'
    }


    return(
        <div key={index} className={styles.postCard}>
            <div className={styles.userDiv}>
                <div className={styles.userImageDiv}>
                    <img src={item.user.image} className={styles.userImage}/>
                </div>
                <div className={styles.userTextDiv}>
                    <p className={styles.userFullName}>{item.user.name}</p>
                    <div className={styles.postStatsText}><a href={`/profile/${item.user.username}`} className={styles.userName}>{item.user.username}</a><p className={styles.statsSeparatorPeriod}>•</p><a>{postDate}</a></div>
                </div>
                <div className={styles.detailsIcon} onClick={()=>{setOverlayOpen(true)}} />
            </div>

            {isOverlayOpen?<PostOverlay userId={userId} item={item} open={setOverlayOpen} setIsDeletePopupOpen={setIsDeletePopupOpen} link={`/post/${item.user._id}/${item._id}`}/>:null}

        <div className={styles.body}  onClick={()=>{window.location.href = (`/post/${item.user._id}/${item._id}`)}}>
            <div className={styles.bodyText} dangerouslySetInnerHTML={{__html:item.body}}/>
            
            <div className={styles.attachmentListDiv}>
            {
                item.attachments.slice(0,2).map((attachment,index)=>{
                    if(index==0){
                        return(
                        <>
                            {attachment.type=="image"?(<img src={attachment.src} className={styles.attachment}/>):(<video controls={true} src={attachment.src} className={styles.attachment}/>)}
                        </>
                        )
                    }else{
                        return(
                            <>
                                {(item.attachments.length-2)}
                            </>
                        )
                    }
                })
            }
            </div>
           
            
        </div>
        
        {isDeletePopupOpen?<DeletePost setOpen={setIsDeletePopupOpen} deletePost={deletePost} item={item}/>:null}
    </div>
    )

}