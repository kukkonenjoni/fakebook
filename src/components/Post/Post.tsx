import { gql, useMutation } from "@apollo/client"
import { Link } from "react-router-dom"
import styles from "./Post.module.css"

const LIKE = gql`
    mutation Mutation($postId: Int) {
        like(postId: $postId) {
            id
            likes {
                id
                firstName
                lastName
            }
        }
    }
`

const Post = (props:any) => {
    console.log(props.post)
    const { author, content, createdAt, imageUrl, link, id, likes } = props.post

    const [Like, { data }] = useMutation(LIKE)
    if (data) console.log(data)

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
    return (
        <section className={styles.container}>
            <div style={{display: "flex", marginLeft: "25px"}}>
                <img src={author.profilePic} alt="profile pic" style={{width: "5rem", height: "5rem", borderRadius: "50%"}}/>
                <div className={styles.post_header}>
                    <Link to={`/user/${author.id}`}>
                    <h2 className={styles.username}>{author.firstName + " " + author.lastName}</h2>
                    </Link>
                    <p className={styles.createdat}>Created {formatDate(createdAt)} </p>
                </div>
            </div>
            <div className={styles.content_container}>
                <p className={styles.content}>{content}</p>
                <p className={styles.content}>{link}</p>
            </div>
            {imageUrl != null ? <div className={styles.img_container}>
                <img src={imageUrl} alt="Post_image" className={styles.image} />
            </div> : ""}
            <div className={styles.footer}>
                <button className={styles.footer_btn}>Comments</button>
                <button className={styles.footer_btn} 
                    onClick={() => Like({variables: {postId: parseInt(id)}})}
                    >Like {likes.length > 0 ? "(" + likes.length + ")" : null}</button>
            </div>
        </section>
    )
}
export default Post