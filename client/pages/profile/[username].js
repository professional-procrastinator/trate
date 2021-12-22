
import {useState,useEffect} from 'react'
import {useRouter} from 'next/router';
import Header from '../../components/ui/header/header';
import ProfileUI from '../../components/profile/profile';
const Profile = () => {
    const [resultProfile,setProfile] = useState(null);
    const [error,setError] = useState(null);
    const router = useRouter();
    const {username} = router.query;

    const fetchProfile = async () => { 
        const response = await fetch(`/api/profile/${router.query.username}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const profile = await response.json();
        if(profile.status!=="success"){
            return setError(profile.details);
        }
        setProfile(profile.details)
    }

    useEffect(async ()=>{
        if(!username){
            return;
        }else{
            fetchProfile();
        }
       
    },[username])
    return(
        <>
        <div>
            {resultProfile==null?<div className="loader" />:<ProfileUI profile={resultProfile}/>}
        </div>
        </>
    )
}
export default Profile;