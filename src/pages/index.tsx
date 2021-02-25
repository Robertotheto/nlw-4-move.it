import { CompletedChallenges } from "../components/completedChallenges";
import { CountDown } from "../components/countdown";
import { ExpierenceBar } from "../components/expierencebar";
import { Profile } from "../components/profile";
import styles from '../styles/pages/home.module.css'
import Head from 'next/head'
import { ChallengeBox } from "../components/challengeBox";
import { CountDownProvider } from "../contexts/CountDownContext";
export default function Home() {
  return (
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
  )
}
