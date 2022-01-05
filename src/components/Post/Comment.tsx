import styles from "./Comment.module.css"

const Comment = (props: any) => {

    const { comment } = props

    return (
        <section className={styles.container}>
            <div className={styles.profile}>
                <img className={styles.profile_pic} src={comment.author.profilePic} alt="profilePic"/>
                <h2 className={styles.profile_name}>{comment.author.firstName}</h2>
                <h2 className={styles.profile_name}>{comment.author.lastName}</h2>
            </div>
            <h1 className={styles.comment}>{comment.comment}</h1>
        </section>
    )
}

export default Comment