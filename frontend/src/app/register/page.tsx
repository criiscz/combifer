import Link from 'next/link'
import styles from './register.module.css'
import RegisterForm from "@/app/register/components/RegisterForm";
export default function RegisterPage(props: any){
    return(
        <section className={styles.registerPane}>
            <div className={styles.registerPane__header}>
                <h2>Registro</h2>
            </div>
            <RegisterForm/>
            <div className={styles.registerPane__footer}>
                <p>¿Ya tienes una cuenta?</p>
                <Link href={'login'}> &nbsp; Entra aquí</Link>
            </div>
        </section>
    )
}