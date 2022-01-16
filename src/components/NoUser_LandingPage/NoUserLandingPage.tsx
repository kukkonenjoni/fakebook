import ConnectedDots from "../StylingAndAnimations/ConnectedDots"
import styles from "./NoUserLandingPage.module.css"
import NoUserForm from "./NoUserForm"
import Ghost from "../StylingAndAnimations/Ghost"

const NoUserLandingPage = () => {

    alert("Accounts to test if you dont want to create your own: emma.smith@gmail.com | password: secret and john.doe@gmail.com | password: secret")

    return(
        <main className={styles.main}>
            <div className={styles.test}>
                <Ghost />
                <NoUserForm />
            </div>
            <ConnectedDots />
        </main>
    )
}

export default NoUserLandingPage