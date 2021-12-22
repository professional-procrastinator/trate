
import io from 'socket.io-client';
import {useRouter} from 'next/router';
import PostCard from "../../../components/home/feed/postCard";
import {useState,useEffect} from 'react';

const Post = () => {
    const router = useRouter();
    const {uid,id} = router.query;

    return(
        <p>{uid},{id}</p>
    )
}

export default Post;