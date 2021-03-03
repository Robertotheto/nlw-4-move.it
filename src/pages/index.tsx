import { CompletedChallenges } from "../components/completedChallenges";
import { CountDown } from "../components/countdown";
import { ExpierenceBar } from "../components/expierencebar";
import { Profile } from "../components/profile";
import styles from '../styles/pages/home.module.css'
import Head from 'next/head'
import { ChallengeBox } from "../components/challengeBox";
import { CountDownProvider } from "../contexts/CountDownContext";
import { GetServerSideProps } from "next";
import { ChallengesProvider } from "../contexts/ChallengeContexts";

interface HomeProps{
  level: number;
  currentExperince: number;
  challengesCompleted: number;
}

export default function Home(props: HomeProps) {
  return (
    <ChallengesProvider
      level={props.level}
      currentExperince={props.currentExperince}
      challengesCompleted={props.challengesCompleted}
    >
    <div className={styles.container}>
      <Head>
        <title>Inicío | move.it</title>
      </Head>
      <ExpierenceBar/>
      <CountDownProvider>
      <section>
        <div>
          <Profile/>
          <CompletedChallenges/>
          <CountDown/>
        </div>
        <div>
          <ChallengeBox/>
        </div>
      </section>
      </CountDownProvider>
    </div>
    </ChallengesProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async(ctx) => {
  const {level, currentExperince, challengesCompleted} = ctx.req.cookies;
  return {
    props: {
      level: Number(level),
      currentExperince: Number(currentExperince),
      challengesCompleted: Number(challengesCompleted),
    }
  }
}