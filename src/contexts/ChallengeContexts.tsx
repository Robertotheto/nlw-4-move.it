import {createContext, ReactNode, useEffect, useState} from 'react'
import Cookies from 'js-cookie';
import challenges from '../../challenges.json'
import { LevelUpModal } from '../components/levelUpModal';

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
    closeLevelUpModal: () => void;
}

interface ChallengesProviderProps{
    children: ReactNode;
    level: number;
    currentExperince: number;
    challengesCompleted: number;
}

export const ChallengesContexts = createContext({} as ChallengeContextData)

export function ChallengesProvider({children, ...rest}: 
    ChallengesProviderProps): JSX.Element {
    const [level, setLevel] = useState(rest.level ?? 1)
    const [currentExperince, setCurrentExperince] = useState(rest.currentExperince ?? 0)
    const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0)
    const [activeChallenge, setActiveChallenge] = useState(null)
    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false)

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

    useEffect(() => {
        Notification.requestPermission();
    },[]);

    useEffect(() => {
        Cookies.set('level', String(level));
        Cookies.set('currentExperince', String(currentExperince));
        Cookies.set('challengesCompleted', String(challengesCompleted));
    },[level, currentExperince, challengesCompleted])

    function levelUp(){
        setLevel(level + 1);
        setIsLevelUpModalOpen(true);
    }
    function closeLevelUpModal(){
        setIsLevelUpModalOpen(false);
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
            closeLevelUpModal,
            }}>
            {children}
            {isLevelUpModalOpen && <LevelUpModal/>}
        </ChallengesContexts.Provider>
    )
}