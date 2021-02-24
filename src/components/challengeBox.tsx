import {useContext} from 'react'
import {ChallengesContexts} from '../contexts/ChallengeContexts'
import styles from '../styles/components/challengeBox.module.css'

export function ChallengeBox(): JSX.Element{

    const {activeChallenge, resetChallenge} = useContext(ChallengesContexts)

    return(
        <div className={styles.challengeBoxContainer}>
            {activeChallenge ? (
                <div className={styles.challengeActive}>
                    <header>{activeChallenge.amount}</header>
                    <main>
                        <img src={`icons/${activeChallenge.type}.svg`} alt="Body"/>
                        <strong>Novo Desafio</strong>
                        <p>{activeChallenge.description}</p>
                    </main>
                    <footer>
                        <button
                        type="button"
                        className={styles.challengeFailedButton}
                        onClick={resetChallenge}
                        >
                            Falhei
                        </button>
                        <button
                        type="button"
                        className={styles.challengeSucceededButton}
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