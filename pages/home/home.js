import Header from "../../components/ui/header/header";

import styles from '../../styles/home/home.module.css'

export default function Home(props){
    return(
        <div className={styles.home}>
            <Header profile={props.profile} />
        </div>
    )
}