import Image from 'next/image'
import styles from './page.module.css'
import Instruction from '@/components/Instruction'

export default function Home() {
  return (
    <main className={styles.main}>

      <Instruction/>
    </main>
  )
}
