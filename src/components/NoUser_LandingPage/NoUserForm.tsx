import { useState } from "react"
import styles from "./NoUserForm.module.css"

const NoUserForm = () => {

        const [Login, setLogin] = useState(true)

        return(
            <section className={styles.frame} style={{height: Login ? "80%" : "100%"}}>
                <div className={styles.nav}>
                    <ul className="links">
                        <li className={`${styles.li} ${styles.signinactive}`}>Sign in</li>
                        <li className={`${styles.li} ${styles.signininactive}`} onClick={() => setLogin(!Login)}>Sign up</li>
                    </ul>
                </div>
                <form className={styles.formsignin}>
                    <label htmlFor="username">Username</label>
                    <input className={styles.formstyling} type="text" name="username" placeholder=""/>
                    <label htmlFor="password">Password</label>
                    <input className={styles.formstyling} type="password" name="password" placeholder=""/>
                    <div className={styles.btnanimate}>
                        <button className={styles.btnsignin}>Sign in</button>
                    </div>
                </form>
                <div className={styles.forgot}>
                    <button className={styles.forgotbutton}>Forgot your password?</button>
                </div>
            </section>
        )
    
}

export default NoUserForm