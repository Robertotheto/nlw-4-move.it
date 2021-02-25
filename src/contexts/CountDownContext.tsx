import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengesContexts } from "./ChallengeContexts";

interface CountDownContextData{
    minutes: number;
    segunds : number;
    hasFinished: boolean;
    isActive: boolean;
    startCountdown: () => void;
    resetCountdown: () => void;
}
interface CountDownProviderProps{
    children: ReactNode;
}

export const CountDownContext = createContext({} as CountDownContextData)

let countdownSetTimeOut : NodeJS.Timeout;

export function CountDownProvider({children}: CountDownProviderProps){
    const {startNewChallenge} = useContext(ChallengesContexts)

    const [time, setTime] = useState(0.05 * 60)
    const [isActive, setIsActive] = useState(false)
    const [hasFinished, setHasFinished] = useState(false)

    const minutes = Math.floor(time/60)
    const segunds = time%60

    function startCountdown(){
        setIsActive(true)
    }
    function resetCountdown(){
        clearTimeout(countdownSetTimeOut)
        setIsActive(false)
        setHasFinished(false)
        setTime(0.05 * 60)

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
        <CountDownContext.Provider value={{
            minutes,
            segunds,
            hasFinished,
            isActive,
            startCountdown,
            resetCountdown,
        }}>
            {children}
        </CountDownContext.Provider>
    )
}
