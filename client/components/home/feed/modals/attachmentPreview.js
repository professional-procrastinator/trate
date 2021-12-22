import {useState,useEffect} from 'react';
import styles from './newPost.module.css';
export default function AttachmentPreview({attachment,remAttachment}){
    
    return(
        <div className={styles.attachmentResultDiv} key={attachment.id}>
        
        {attachment.type=="image"?(<img src={attachment.src} id={attachment.id} className={styles.attachmentImage}/>):<video src={attachment.src} className={styles.attachmentImage} controls={true} />}
       
        <div className={styles.attachmentStatsDiv} >
            
            <p className={styles.attachmentStatsText}>{attachment.size}</p>
            <div className={styles.attachmentDeleteIcon} onClick={(evt)=>{remAttachment(attachment)}}/>
            
        </div>

    </div>
    )
    
}