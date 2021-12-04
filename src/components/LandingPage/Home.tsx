import styles from "./Home.module.css"
import { useMutation, gql } from "@apollo/client"
import { FormEvent, useRef, useState } from "react"


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

const Home = (): JSX.Element => {

    const [Content, setContent] = useState("")
    const [ImageName, setImageName] = useState("")
    const inputFile = useRef<HTMLInputElement>(null);
    const [ErrorMsg, setErrorMsg] = useState("")

    const [singleUpload] = useMutation(UPLOAD_FILE, {
        onCompleted: data => submitPost(data)
    })
    const [createPost] = useMutation(CREATE_POST, {
        onCompleted: data => console.log(data)
    })

    const handleFileChange = (e: FormEvent<HTMLDivElement>) => {
        e.preventDefault()
        const file = inputFile.current?.files![0]
        if (file) {
            setErrorMsg("")
            singleUpload({ variables: { file }})
        } else if(!file && Content) {
            setErrorMsg("")
            return
        } else {
            setErrorMsg("Please fill atleast one field")
            return
        }
    }
    const submitPost = (data: any) => {
        console.log(data.singleUpload.url)
        createPost({ variables: {content: Content, imageUrl: data.singleUpload.url}})
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
            <div>
                <h1>Hello</h1>
            </div>
        </div>
    )
    
}
export default Home