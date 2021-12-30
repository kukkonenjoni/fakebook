import { gql, useQuery } from "@apollo/client"
import { useParams } from "react-router-dom"
import styles from "./PostDetail.module.css"

const GET_POST = gql`
    query GetPost($postId: Int) {
        getPost(postId: $postId) {
            id
            imageUrl
            author {
                firstName
                lastName
                id
            }
            content
            createdAt
            link
            likes {
                id
            }
        }
    }
`

const PostDetail = () => {

    const { id }: {id: any} = useParams()
    const {data, loading, error} = useQuery(GET_POST, {variables: {postId: parseInt(id)}})
    if (data) console.log(data)

    return(
        <div className={styles.friend_requests}>
            <h1>HOLA AMIGO</h1>
         </div>
    )
}

export default PostDetail