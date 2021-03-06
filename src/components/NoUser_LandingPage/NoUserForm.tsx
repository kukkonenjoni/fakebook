import { useEffect, useRef, useState } from "react"
import styles from "./NoUserForm.module.css"
import { useSpring, animated } from 'react-spring'
import LoadingAnimation from "../StylingAndAnimations/LoadingAnimation"
import { useMutation, gql } from "@apollo/client";
import { useRecoilState } from "recoil";
import userState from "../../atom"

const LOGIN = gql`
    mutation CreateUser($email: String, $password: String) {
    login(email: $email, password: $password) {
        token
        user {
            id
            email
            age
            firstName
            lastName
            friends {
                firstName
                lastName
                id
                status
            }
            sent_friendreq {
                firstName
                lastName
                id
            }
            received_friendreq {
                firstName
                lastName
                id
                profilePic
            }
        }
    }
}
`
const CREATE_USER = gql`
    mutation CreateUser($firstName: String, $lastName: String, $email: String, $age: Int, $password: String) {
    createUser(firstName: $firstName, lastName: $lastName, email: $email, age: $age, password: $password) {
        email
        }
    }
`

const NoUserForm = () => {

    const [SignIn, {data, loading, error}] = useMutation(LOGIN)
    const [CreateUser, CreateUserData] = useMutation(CREATE_USER)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_CurrentUser, setCurrentUser] = useRecoilState(userState)
    const [Password, setPassword] = useState("")
    const [Email, setEmail] = useState("")

    const props = useSpring({
         to: { opacity: 1, transform:"translate(0px, 0px" }, 
         from: { opacity: 0, transform:"translate(300px, 0px"  },
         reset: false,
         config:{duration: 200}})

    const [Login, setLogin] = useState(true)
    const formElement = useRef<any>(null);

    const SignUp = async (e:any) => {
        e.preventDefault()
        try {
            await CreateUser({variables: {
                firstName: e.target.firstname.value,
                lastName: e.target.lastname.value,
                email: e.target.email.value,
                age: parseInt(e.target.age.value),
                password: e.target.password.value
            }})
            alert(`Account succesfully created with email: ${e.target.email.value}, please log in`)
            formElement.current.reset()
        } catch (err) {
            console.error(err)
            alert(err)
        }

    }

    useEffect(() => {
        if (data) {
            console.log("Data from login",data.login)
            localStorage.setItem('token', data.login.token)
            setCurrentUser(data.login.user)
            
        }
    }, [data, setCurrentUser])

    useEffect(() => {

    }, [CreateUserData])

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
                    <button type="submit" className={styles.forgotbutton} onClick={() => alert("Sorry, i dont work")}>Forgot your password?</button>
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
            <form className={styles.formsignin} style={{height:"90%"}} onSubmit={(e) => SignUp(e)} ref={formElement}>
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