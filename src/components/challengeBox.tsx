import {useContext} from 'react'
import {ChallengesContexts} from '../contexts/ChallengeContexts'
import { CountDownContext } from '../contexts/CountDownContext';
import styles from '../styles/components/challengeBox.module.css'

export function ChallengeBox(): JSX.Element{

    const {
        activeChallenge, 
        resetChallenge, 
        completedChallenge} = useContext(ChallengesContexts);
    const {resetCountdown} = useContext(CountDownContext);

    function handleChallengeSucceeded(){
        completedChallenge();
        resetCountdown();
    }
    function handleChallengeFailed(){
        resetChallenge();
        resetCountdown();
    }

    return(
        <div className={styles.challengeBoxContainer}>
            {activeChallenge ? (
                <div className={styles.challengeActive}>
                    <header>Ganhe {activeChallenge.amount} xp</header>
                    <main>
                        <img src={`icons/${activeChallenge.type}.svg`} 
                        alt="Body"/>
                        <strong>Novo Desafio</strong>
                        <p>{activeChallenge.description}</p>
                    </main>
                    <footer>
                        <button
                        type="button"
                        className={styles.challengeFailedButton}
                        onClick={handleChallengeFailed}
                        >
                            Falhei
                        </button>
                        <button
                        type="button"
                        className={styles.challengeSucceededButton}
                        onClick={handleChallengeSucceeded}
                        >
                            Completei
                        </button>
                    </footer>
                </div>
            ) : (
                <div className={styles.challengeNotActive}>
                <strong>Finalize um ciclo para receber um desafio.</strong>
                <p>
                    <img src="icons/level-up.svg" alt="Level Up"/>
                    Avance de level completando desafios.
                </p>
            </div>
            )}
        </div>
    )
}