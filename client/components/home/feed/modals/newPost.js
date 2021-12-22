import {useRef, useState, useEffect} from 'react';
import styles from './newPost.module.css';
import AttachmentPreview from './attachmentPreview';
import niceBytes from '../../../../global/units/units';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import 'react-quill/dist/quill.snow.css';

const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
  ];

const modules = {toolbar: [
    [{ 'header': [1, 2, false] }],       // header dropdown
    ['bold', 'italic', 'underline', 'strike'],       // toggled buttons
    ['blockquote', 'link'],                    // blocks
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],    // lists
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  }
}
export default function NewPostPopup({newPost,closeModal}){
    let editor = useRef(null)
    let ref = useRef(null);
    
    const [postBody,setPostBody] = useState('');
    const [attachments,setAttachments] = useState([]);

    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            closeModal();
        }
    }

    const Change = (content, delta, source, qeditor) => {
        setPostBody(content);
    }

    const handleUpload = async (file)=>{


        var reader = new FileReader();
        reader.readAsDataURL(file)
        

        reader.onload = () => {
            const attachment = {
                    src:reader.result,
                    id:Math.random().toString(36).slice(2),
                    name:file.name,
                    type:file.type.split('/')[0],
                    size:niceBytes(file.size)
            }
            setAttachments([attachment,...attachments])
        }
        
    }

    const removeAttachment = (delAttachment) => {
 
        setAttachments((prevAttachments)=>{
            return prevAttachments.filter((attachment)=>{
                return attachment.id!==delAttachment.id;
            })
        })
    }

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
          document.removeEventListener('click', handleClickOutside, true);
        };
    });

    return(
        <div className={styles.popupBackground}>
            <div className={styles.popupDiv} ref={ref}>
                <div className={styles.popupHeader}>
                    <h2 className={styles.popupHeadingText}>New Post</h2>
                    <div className={styles.popupHeaderCloseIcon} onClick={(evt)=>{closeModal()}} />
                </div>


                <div className={styles.popupContent} style={{height:(attachments.length==0?'fit-content':'70%')}}>
                   
                    
                    <ReactQuill ref={editor} value={postBody} onChange={Change} formats={formats} modules={modules} className={styles.popupBodyEditor} placeholder='Share something with the world.' theme='snow' style={{height:attachments.length==0?'350px':'fit-content;'}}/>
                    
                    <div className={styles.attachmentDiv}>
                        <div className={styles.attachmentText}>
                            <label className={styles.attachmentLabel}>Attachments</label>
                            <p>{attachments.length}</p>
                            <input type="file" placeholder="Attachments" id="attachmentInput" style={{display:'none'}} onChange={(evt)=>{handleUpload(evt.target.files[0])}} />
                        </div>
                        <label className={styles.attachmentIcon} for="attachmentInput" />
                    </div>

                    {attachments.length==0?(
                        <div className={styles.noAttachmentsDiv}>

                            <div className={styles.noAttachmentIcon} />
                            <p className={styles.noAttachmentText}>No Attachments</p>

                        </div>
                    ):(
                        <div className={styles.attachmentPrevDiv}>
                        {
                            attachments.map((attachment)=>{
                                return(<AttachmentPreview attachment={attachment} remAttachment={removeAttachment}/>)
                            })
                        }
                    </div>)}


                    <button onClick={()=>{
                        newPost(editor,{id:Math.random().toString(36).slice(2),body:postBody,attachments:attachments});
                        
                    }} className={styles.createButton}>Create</button>
                   
                </div>
            </div>
        </div>
    )
}

//style={{width:document.getElementById(attachment.id).width}}