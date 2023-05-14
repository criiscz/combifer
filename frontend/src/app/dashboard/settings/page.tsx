import Image from "next/image";
import styles from './style.module.css'
export default function SettingsPage() {
  return (
    <div className={styles.maintance}>
      <div className={styles.elements}>
        <h1>Settings</h1>
        <img
          alt="maintaince"
          width={640}
          height={640}
          src={'https://www.sfu.ca/siat/student_projects/iat339/nca5/P2_NootNoot/public_html/Gifs/homepageanimation/homePageAnimation-640px.gif'}
        />
        <h2>Building site...</h2>
      </div>
    </div>
  )
}