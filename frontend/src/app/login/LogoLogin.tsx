import Image from 'next/image';
import styles from './login.module.css'
export default function LogoLogin() {
  return (
    <div className={styles.logo}>
      <Image src="/icon.png" alt="logo" width={200} height={200}/>
      <h1>FERRETERÍA</h1>
      <h2>COMBIFER</h2>
    </div>
  );
}