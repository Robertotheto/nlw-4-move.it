import { useContext } from 'react'
import { ChallengesContexts } from '../contexts/ChallengeContexts'
import styles from '../styles/components/experiencebar.module.css'
export function ExpierenceBar(){

    const {currentExperince,experienceToNextLevel} = useContext(ChallengesContexts)
    const percentToNextLevel = Math.round(currentExperince*100)/experienceToNextLevel

    return(
        <header className={styles.experienceBar}>
            <span>0 xp</span>
            <div>
                <div style={{width: `${percentToNextLevel}%`}}/>
                <span 
                    className={styles.currentExpirience}
                    style={{left: `${percentToNextLevel}%`}}
                >
                    {currentExperince} xp
                </span>
            </div>
            <span>{experienceToNextLevel} xp</span>
        </header>
    )
}