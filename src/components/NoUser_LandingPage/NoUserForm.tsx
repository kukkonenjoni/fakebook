import { useEffect, useState } from "react"
import styles from "./NoUserForm.module.css"
import { useSpring, animated } from 'react-spring'
import LoadingAnimation from "../StylingAndAnimations/LoadingAnimation"
import { useMutation, gql } from "@apollo/client";
import { useRecoilState } from "recoil";
import userState from "../../atom"

const LOGIN = gql`
    mutation Login($email: String, $password: String) {
    login(email: $email, password: $password) {
    token
    user {
      id
      email
      age
      firstName
      lastName
    }
  }
}
`

const NoUserForm = () => {

    const [SignIn, {data, loading, error}] =useMutation(LOGIN)
    const [_CurrentUser, setCurrentUser] = useRecoilState(userState)
    const [Password, setPassword] = useState("")
    const [Email, setEmail] = useState("")

    const props = useSpring({
         to: { opacity: 1, transform:"translate(0px, 0px" }, 
         from: { opacity: 0, transform:"translate(300px, 0px"  },
         reset: false,
         config:{duration: 200}})

    const [Login, setLogin] = useState(true)

    useEffect(() => {
        if (data) {
            localStorage.setItem('token', data.login.token)
            setCurrentUser(data.login.user)
            
        }
    }, [data, setCurrentUser])
    return(
        <section className={styles.frame} style={{height: Login ? "75%" : "100%"}}>
            {
            loading ? 
            
            <LoadingAnimation />

            :
            Login ? 
            <animated.div style={props} className={styles.animateddiv}>
                <nav className={styles.nav}>
                    <ul className="links">
                        <li className={`${styles.li} ${styles.signinactive}`}>Sign in</li>
                        <li className={`${styles.li} ${styles.signininactive}`} onClick={() => setLogin(!Login)}>Sign up</li>
                    </ul>
                </nav>
                {error?.graphQLErrors.map((err, i) => {
                    return(
                        <h1 key={i} style={{color: "red", marginTop: "-15px", marginBottom: "15px"}}>{err.message}</h1>
                    )
                })}
                <form className={styles.formsignin} onSubmit={async (e) => {
                    e.preventDefault()
                    try {
                        await SignIn({variables: {email: Email, password: Password}})
                    } catch (err) {
                        console.error(err)
                        return "Please fill both fields!"
                    }
                
                }} >
                    <label htmlFor="email">Email</label>
                    <input className={styles.formstyling} type="text" name="email" placeholder="" onChange={(e) => setEmail(e.target.value)} />
                    <label htmlFor="password">Password</label>
                    <input className={styles.formstyling} type="password" name="password" placeholder="" onChange={(e) => setPassword(e.target.value)} />
                    <div className={styles.btnanimate}>
                        <button className={styles.btnsignin}>Sign in</button>
                    </div>
                </form>
                <div className={styles.forgot}>
                    <button type="submit" className={styles.forgotbutton}>Forgot your password?</button>
                </div>
            </animated.div>
            :
            <animated.div style={props} className={styles.animateddiv}>
            <nav className={styles.nav}>
                <ul className="links">
                    <li className={`${styles.li} ${styles.signininactive}`} onClick={() => setLogin(!Login)}>Sign in</li>
                    <li className={`${styles.li} ${styles.signinactive}`}>Sign up</li>
                </ul>
            </nav>
            <form className={styles.formsignin} style={{height:"90%"}}>
                <label htmlFor="firstname">First Name</label>
                <input className={styles.formstyling} type="text" name="firstname" placeholder=""/>
                <label htmlFor="lastname">Last Name</label>
                <input className={styles.formstyling} type="text" name="lastname" placeholder=""/>
                <label htmlFor="email">Email</label>
                <input className={styles.formstyling} type="text" name="email" placeholder=""/>
                <label htmlFor="age">Age</label>
                <input className={styles.formstyling} type="text" name="age" placeholder=""/>
                <label htmlFor="password">Password</label>
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