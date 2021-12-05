import styles from "./Post.module.css"

const Post = (props:any) => {
    const { author, content, createdAt, id, imageUrl, link } = props.post

    // Amount of time since post was created
    const formatDate = (postDate: string) => {
        let timeSincePost = Date.now() -parseInt(postDate)
        timeSincePost = timeSincePost / (60*60*60*24)
        if (timeSincePost < 1 && timeSincePost > 0.01) {
            let minutes = 60/100*timeSincePost
            minutes = parseFloat(minutes.toFixed(2))
            console.log(minutes.toFixed(2))
            let dateString = minutes.toString().split(".").map((num) => parseInt(num))
            return dateString[1] + " minutes ago"
        } else if (timeSincePost >= 1 && timeSincePost <= 24){
            let dateString = timeSincePost.toString().split(".").map((num) => parseInt(num))
            return dateString[0] + " hours ago"
        } else if (timeSincePost > 24) {
            let dateString = timeSincePost.toString().split(".")
            let days = (parseInt(dateString[0])/24).toString().split(".")
            if (days[0] === "1") {
                return days[0] + " day ago"
            } else {
                return days[0] + " days ago"
            }
        } else {
            return " a few seconds ago"
        }
    }

    console.log(props.post)
    return (
        <section className={styles.container}>
            <div>
                <h2 className={styles.username}>{author.firstName + " " + author.lastName}</h2>
                <p>Created {formatDate(createdAt)} </p>
            </div>
            <p>{content}</p>
            <p>{link}</p>
            <div className={styles.img_container}>
                {imageUrl != null ? <img src={imageUrl} alt="Post_image" className={styles.image} /> : ""}
            </div>
            <h2>Comments</h2>
        </section>
    )
}
export default Post