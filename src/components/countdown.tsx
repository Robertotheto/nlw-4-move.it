import { useContext, useEffect, useState } from 'react'
import {ChallengesContexts} from '../contexts/ChallengeContexts'
import styles from '../styles/components/countdown.module.css'

let countdownSetTimeOut : NodeJS.Timeout;

export function CountDown(){
    const {startNewChallenge} = useContext(ChallengesContexts)

    const [time, setTime] = useState(0.05 * 60)
    const [isActive, setIsActive] = useState(false)
    const [hasFinished, setHasFinished] = useState(false)

    const minutes = Math.floor(time/60)
    const segunds = time%60

    const [minutesLeft, minutesRigth] = String(minutes).padStart(2, '0').split('')
    const [segundsLeft, segundsRigth] = String(segunds).padStart(2, '0').split('')

    function startCountdown(){
        setIsActive(true)
    }
    function resetCountdown(){
        clearTimeout(countdownSetTimeOut)
        setIsActive(false)
        setTime(25*60)

    }
    useEffect(() => {
        if(isActive && time > 0){
            countdownSetTimeOut = setTimeout(() => {
                setTime(time - 1)
            }, 1000)
        }else if(isActive && time === 0){
            setHasFinished(true)
            setIsActive(false)
            startNewChallenge()
        }
    }, [isActive, time])
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
                            className={`${styles.countDownButton} ${styles.countDownButtonActive}`}
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