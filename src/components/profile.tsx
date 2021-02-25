import { useContext } from 'react'
import { ChallengesContexts } from '../contexts/ChallengeContexts'
import styles from '../styles/components/profile.module.css'
export function Profile(){
    const {level} = useContext(ChallengesContexts)
    return(
        <div className={styles.profileContainer}>
            <img src="https://avatars.githubusercontent.com/u/56528209?v=4" alt="Roberto Filho"/>
            <div>
                <strong>Roberto Filho</strong>
                <p>
                    <img src="icons/level.svg" alt="Level"/>
                        Level {level}
                </p>
            </div>
        </div>
    )
}