import styles from "../../styles/Loading.module.css"

const LoadingAnimation = () => {
    return(
        <div className={styles.container}>
            <div className={styles.ring}></div>
            <div className={styles.ring}></div>
            <div className={styles.ring}></div>
            <p>Loading...</p>
        </div>
    )
}
export default LoadingAnimation;