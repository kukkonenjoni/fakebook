import { gql, useQuery } from "@apollo/client"
import { useParams } from "react-router-dom"
import LoadingAnimation from "../StylingAndAnimations/LoadingAnimation"
import Post from "./Post"
import styles from "./PostDetail.module.css"
import Comment from "./Comment"

const GET_POST = gql`
    query Query($postId: Int) {
    getPost(postId: $postId) {
        id
        imageUrl
        author {
            profilePic
            firstName
            lastName
            id
        }
        content
        createdAt
        likes {
            id
        }
        comments {
            id
            comment
            author {
                firstName
                lastName
                id
                profilePic
            }
        }
    }
}
`

const PostDetail = () => {

    const { id }: {id: any} = useParams()
    const { data, loading } = useQuery(GET_POST, {variables: {postId: parseInt(id)}})

    if (loading) return <LoadingAnimation />

    return(
        <div className={styles.container}>
            {data && <Post post={data.getPost}/>}
            {data.getPost.comments.map((comment:any) => {
                return <Comment comment={comment}/>
            })}
        </div>
    )
}

export default PostDetail