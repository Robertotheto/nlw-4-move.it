import styles from '../styles/components/profile.module.css'
export function Profile(){
    return(
        <div className={styles.profileContainer}>
            <img src="https://avatars.githubusercontent.com/u/56528209?v=4" alt="Roberto Filho"/>
            <div>
                <strong>Roberto Filho</strong>
                <p>
                    <img src="icons/level.svg" alt="Level"/>
                    Level 1</p>
            </div>
        </div>
    )
}