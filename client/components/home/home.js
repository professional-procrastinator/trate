import {useSession} from 'next-auth/client';
import Header from '../ui/header/header';
import styles from '../../styles/home/home.module.css'
import io from 'socket.io-client';
import {useState,useEffect} from 'react';


import Feed from './feed/feed';
import {ToastContainer} from 'react-toastify';
export default function Home(){
    const [session,loading] = useSession();
    const [socket,setSocket] = useState(null);
    const [userId,setUserId] = useState(null);
    const [feed,setFeed] = useState([]);
    const [isLoading,setLoading] = useState(false);

    useEffect(async () => {
        setLoading(true);
        
        const response = await fetch(`/api/me`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const profile = await response.json();
        setUserId(profile.user._id);
        const socket = io('https://trate.herokuapp.com',{
                auth: {
                    id:profile.user._id
                }
        });

        setSocket(socket);

        return(()=>{socket.disconnect()});
    },[]);

    useEffect(()=>{
        if(socket!==null){

            socket.on('posts',(data)=>{
                setFeed(data.reverse());
                setLoading(false);
            })

            socket.on('post',(data)=>{
                setFeed((prevFeed)=>{
                    return [data,...prevFeed];
                });
            })

            socket.on('deleted-post',(data)=>{
                setFeed((prevFeed)=>{
                    return prevFeed.filter((post)=>{
                        return post._id!==data.id;
                    })
                })
            })
        }
    },[socket])

    
    return(
        <div className={styles.home}>
            <Header />

            {isLoading?(<div className={styles.feedLoader}>
                <div className="loader"></div>
                <p>Fetching your feed</p>
                </div>):(<Feed userId={userId} feed={feed} socket={socket}/>)}   

                
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
        </div>
    )
}


/*

                */