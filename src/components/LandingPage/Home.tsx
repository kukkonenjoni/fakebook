import styles from "./Home.module.css"
import { useMutation, gql, useQuery } from "@apollo/client"
import { FormEvent, useEffect, useRef, useState } from "react"
import Post from "../Post/Post"


const UPLOAD_FILE = gql`
    mutation singleUpload($file: Upload!){
        singleUpload(file: $file) {
            url
        }
    }
`
const CREATE_POST = gql`
    mutation createPost($imageUrl: String, $content: String, $link: String ){
        createPost(imageUrl: $imageUrl, content: $content, link: $link) {
            content
            imageUrl
            link
            createdAt
            link
            author {
                firstName
                lastName
            }
        }
    }
`
const GET_POSTS = gql`
    query currentUser {
        currentUser {
            post {
                createdAt
                id
                content
                imageUrl
                author {
                    firstName
                    lastName
                }
            }
            friends {
                post {
                    createdAt
                    id
                    imageUrl
                    content
                    createdAt
                    link
                    author {
                        firstName
                        lastName
                    }
                }
            }
  }
}
`
// setAllPosts(prevState => {return [...data.createPost, ...prevState]})
const Home = (): JSX.Element => {

    const [Content, setContent] = useState("")
    const [ImageName, setImageName] = useState("")
    const inputFile = useRef<HTMLInputElement>(null);
    const [ErrorMsg, setErrorMsg] = useState("")
    const [AllPosts, setAllPosts] = useState(Array)

    const [singleUpload] = useMutation(UPLOAD_FILE, {
        onCompleted: data => submitPost(data)
    })
    const [createPost] = useMutation(CREATE_POST, {
        onCompleted: data => setAllPosts(prevState => {return [data.createPost, ...prevState]})
    })
    const { loading, data } = useQuery(GET_POSTS)

    useEffect(() => {
        let fPosts: any[] = []
        if (data) {
            data.currentUser.friends.forEach((friend: any) => {
                fPosts = friend.post.map((post: any) => {
                    return post
                })
            })
            const allPosts = data.currentUser.post.concat(fPosts)
            allPosts.sort((a: { createdAt: number },b: { createdAt: number }) => {
                if (a.createdAt > b.createdAt) {
                    return -1
                } else if (a.createdAt < b.createdAt) {
                    return 1
                } else {
                    return 0
                }
            })
            setAllPosts(allPosts)
        }
    }, [data])

    const handleFileChange = (e: FormEvent<HTMLDivElement>) => {
        e.preventDefault()
        const file = inputFile.current?.files![0]
        console.log(file)
        if (file != undefined) {
            setErrorMsg("")
            singleUpload({ variables: { file }})
        } else if(!file && Content) {
            setErrorMsg("")
            submitPost()
            return
        } else {
            setErrorMsg("Please fill atleast one field")
            return
        }
    }
    const submitPost = (data: any = null) => {
        if (data) {
            createPost({ variables: {content: Content, imageUrl: data.singleUpload.url}})
        } else {
            createPost({ variables: {content: Content}})
        }
    }

    return(
        <div style={{width: "100%", display:"flex", flexDirection: "column", alignItems:"center"}}>
            <div className={styles.bground} onSubmit={(e) => handleFileChange(e)}>
                <form id="formElem" className={styles.form}>
                    <h1 className={styles.post_title}>Create a post for your friends to see!</h1>
                    <textarea className={styles.textinput} onChange={(e) => setContent(e.target.value)}/>
                    <div className={styles.input_div}>
                        <label htmlFor="image" className={styles.post_title}>Choose image</label>
                        <input type="file" name="image" id="image" ref={inputFile} onChange={(e)=> setImageName(e.target.files![0].name)}/>
                        <h1 className={styles.post_title}>{ImageName ? ImageName: ""}</h1>
                    </div>
                    <input type="submit" className={styles.submitbtn} value="Submit post!" />
                    <h2 className={styles.error}>{ErrorMsg}</h2>
                </form>
            </div>
            {AllPosts.map((post: any) => {
                return <Post post={post}/>
            })}
        </div>
    )
    
}
export default Home