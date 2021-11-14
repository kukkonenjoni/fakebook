import { useEffect, useState } from "react"
import styles from "./NoUserForm.module.css"
import { useSpring, animated } from 'react-spring'
import LoadingAnimation from "../StylingAndAnimations/LoadingAnimation"

const NoUserForm = () => {

    const props = useSpring({
         to: { opacity: 1, transform:"translate(0px, 0px" }, 
         from: { opacity: 0, transform:"translate(300px, 0px"  },
         reset: true,
         config:{duration: 200}})

    const [Login, setLogin] = useState(true)
    const [Loading, setLoading] = useState(false)
    const [ErrorMsg, setErrorMsg] = useState("")

    useEffect(() => {

    },[Loading])

    const Signup = () => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            setLogin(true)
        }, 2000)
    }

    return(
        <section className={styles.frame} style={{height: Login ? "75%" : "100%"}}>
            {Login ? 
            <animated.div style={props} className={styles.animateddiv}>
                <nav className={styles.nav}>
                    <ul className="links">
                        <li className={`${styles.li} ${styles.signinactive}`}>Sign in</li>
                        <li className={`${styles.li} ${styles.signininactive}`} onClick={() => setLogin(!Login)}>Sign up</li>
                    </ul>
                </nav>
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
            </animated.div>
            
            : Loading ? 
            
            <LoadingAnimation />

            :

            <animated.div style={props} className={styles.animateddiv}>
            <nav className={styles.nav}>
                <ul className="links">
                    <li className={`${styles.li} ${styles.signininactive}`} onClick={() => setLogin(!Login)}>Sign in</li>
                    <li className={`${styles.li} ${styles.signinactive}`}>Sign up</li>
                </ul>
            </nav>
            <form className={styles.formsignin} style={{height:"90%"}} onSubmit={Signup}>
                <label htmlFor="username">Username</label>
                <input className={styles.formstyling} type="text" name="username" placeholder=""/>
                <label htmlFor="email">Email</label>
                <input className={styles.formstyling} type="text" name="email" placeholder=""/>
                <label htmlFor="password">Password</label>
                <input className={styles.formstyling} type="password" name="password" placeholder=""/>
                <label htmlFor="password">Confirm Password</label>
                <input className={styles.formstyling} type="password" name="password" placeholder=""/>
                <div className={styles.btnanimate} style={{marginTop: "10px"}}>
                    <button type="submit" className={styles.btnsignin}>Sign up</button>
                </div>
            </form>
            </animated.div>}
        </section>
    )
    
}

export default NoUserForm