import { providers, signIn,useSession } from "next-auth/client";
import {useEffect} from "react";

import Image from "next/image";
import GLogo from '../images/g-logo.png';

import styles from "../styles/login.module.css";
export default function Login({ providers }) {
    const [session, loading] = useSession();

    useEffect(()=>{
        if(session){
            window.location.href = '/';
        }
    },[session])
    if(!session){
        return (
            <div className={styles.mainParent}>
                <h1 className={styles.trateHeading}>Trate</h1>
                <p className={styles.description}>Get started today.</p>
               
                        <div>
                            <div onClick={() => signIn()} className={styles.loginButton}>
                                <Image src={GLogo} className={styles.GLogo} />
                                <p>Login with Google</p>
                            </div>
                        </div>
            </div>
        );
    }else{
        return window.location.href = '/';
    }
}
export async function getServerSideProps(context) {
  return { props: { providers: await providers() } };
}