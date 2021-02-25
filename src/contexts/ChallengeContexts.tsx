import {createContext, ReactNode, useEffect, useState} from 'react'
import challenges from '../../challenges.json'

interface Challenge{
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface ChallengeContextData{
    level: number;
    currentExperince: number; 
    challengesCompleted: number;
    experienceToNextLevel: number;
    activeChallenge: Challenge;
    levelUp: () => void;
    startNewChallenge: () => void;
    resetChallenge: () => void;
    completedChallenge: () => void;
}

interface ChallengesProviderProps{
    children: ReactNode;
}

export const ChallengesContexts = createContext({} as ChallengeContextData)

export function ChallengesProvider({children}: ChallengesProviderProps): JSX.Element{
    const [level, setLevel] = useState(1)
    const [currentExperince, setCurrentExperince] = useState(0)
    const [challengesCompleted, setChallengesCompleted] = useState(0)
    const [activeChallenge, setActiveChallenge] = useState(null)

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

    useEffect(() => {
        Notification.requestPermission();
    },[])

    function levelUp(){
        setLevel(level + 1)
    }
    function startNewChallenge(){
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
        const challenge = challenges[randomChallengeIndex]
        setActiveChallenge(challenge)

        new Audio('/notification.mp3').play();

        if(Notification.permission === 'granted'){
            new Notification('Novo Desafio 🥳 ',{
                body: `Valendo ${challenge.amount} xp`
            })
        }
    }
    function resetChallenge(){
        setActiveChallenge(null)
    }
    function completedChallenge(){
        if(!activeChallenge){
            return;
        }
        const {amount} = activeChallenge;
        let finalExperience = currentExperince + amount;
        if(finalExperience >= experienceToNextLevel){
            finalExperience = finalExperience - experienceToNextLevel
            levelUp()
        }
        setCurrentExperince(finalExperience);
        setActiveChallenge(null);
        setChallengesCompleted(challengesCompleted + 1);
    }
    return(
        <ChallengesContexts.Provider 
        value={{
            level,
            currentExperince, 
            challengesCompleted,
            experienceToNextLevel,
            activeChallenge,
            levelUp,
            startNewChallenge,
            resetChallenge,
            completedChallenge,
            }}>
            {children}
        </ChallengesContexts.Provider>
    )
}