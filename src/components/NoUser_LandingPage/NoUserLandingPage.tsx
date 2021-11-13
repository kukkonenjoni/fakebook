import ConnectedDots from "../StylingAndAnimations/ConnectedDots"
import styles from "./NoUserLandingPage.module.css"
import NoUserForm from "./NoUserForm"
import Ghost from "../StylingAndAnimations/Ghost"

const NoUserLandingPage = () => {
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