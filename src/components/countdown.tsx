import { useContext} from 'react'
import { CountDownContext } from '../contexts/CountDownContext'
import styles from '../styles/components/countdown.module.css'

export function CountDown(){
    
    const {
        minutes,
        segunds,
        hasFinished,
        isActive,
        resetCountdown,
        startCountdown } = useContext(CountDownContext)

    const [minutesLeft, minutesRigth] = String(minutes).padStart(2, '0').split('')
    const [segundsLeft, segundsRigth] = String(segunds).padStart(2, '0').split('')

   
    return(
        <div>
            <div className={styles.countDownContainer}>
                <div>
                    <span>{minutesLeft}</span>
                    <span>{minutesRigth}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{segundsLeft}</span>
                    <span>{segundsRigth}</span>
                </div>
            </div>
            {hasFinished ? (
                 <button
                 disabled
                 className={styles.countDownButton}
                 >
                Ciclo Encerrado
             </button>
            ) : (
                <>
                    {isActive ? (
                        <button
                            type="button"
                            className={`${styles.countDownButton}
                            ${styles.countDownButtonActive}`}
                            onClick={resetCountdown}
                            >
                            Abandonar Ciclo
                        </button>
                        ) : (
                        <button
                            type="button"
                            className={styles.countDownButton}
                            onClick={startCountdown}
                            >
                            Iniciar um ciclo
                        </button>
                        )}
                </>
            )}
        </div>
    )
}