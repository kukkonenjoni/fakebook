import { gql, useMutation, useQuery } from "@apollo/client"
import { useParams } from "react-router-dom"
import LoadingAnimation from "../StylingAndAnimations/LoadingAnimation"
import Post from "./Post"
import styles from "./PostDetail.module.css"
import Comment from "./Comment"
import { useState } from "react"

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
const COMMENT = gql`
    mutation Comment($postId: Int, $content: String) {
        comment(postId: $postId, content: $content) {
            id
            comment
            author {
                firstName
                lastName
                profilePic
                id
            }
        }
    }
`

const PostDetail = () => {

    const [NewComment, setNewComment] = useState<Array<any>>([])
    const [Comm, setComm] = useState("")

    const { id }: {id: any} = useParams()
    const { data, loading } = useQuery(GET_POST, {variables: {postId: parseInt(id)}})

    const [addTodo, MutationData] = useMutation(COMMENT, { variables: {
        content: Comm,
        postId: parseInt(data?.getPost.id)
    },
    onCompleted: data => setNewComment([data.comment,...NewComment]),
    fetchPolicy: "no-cache"
    });

    if (loading) return <LoadingAnimation />

    console.log(Comm)

    return(
        <div className={styles.container}>
            {data && <Post post={data.getPost}/>}
            <div className={styles.comment_container}>
                <textarea onChange={(e) => setComm(e.target.value)} className={styles.text_area}></textarea>
                <button onClick={() => addTodo()}>Comment</button>
            </div>
            {NewComment.map((comment:any) => {
                return <Comment comment={comment}/>
            })}
            {data && data.getPost.comments.map((comment:any) => {
                return <Comment comment={comment}/>
            })}
        </div>
    )
}

export default PostDetail