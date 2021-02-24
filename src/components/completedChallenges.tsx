import { useContext } from 'react'
import { ChallengesContexts } from '../contexts/ChallengeContexts'
import styles from '../styles/components/completedChallenges.module.css'
export function CompletedChallenges(){
    const {challengesCompleted} = useContext(ChallengesContexts)
    return(
        <div className={styles.completedChallengesContainer} >
            <span>Desafios Completos</span>
            <span>{challengesCompleted}</span>
        </div>
    )
}