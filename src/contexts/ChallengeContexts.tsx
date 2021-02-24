import {createContext, ReactNode, useState} from 'react'
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

    function levelUp(){
        setLevel(level + 1)
    }
    function startNewChallenge(){
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
        const challenge = challenges[randomChallengeIndex]
        setActiveChallenge(challenge)
    }
    function resetChallenge(){
        setActiveChallenge(null)
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
            }}>
            {children}
        </ChallengesContexts.Provider>
    )
}