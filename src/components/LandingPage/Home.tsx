import styles from "./Home.module.css"
import { useMutation, gql } from "@apollo/client"
import { FormEvent, useRef } from "react"


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
        }
    }
`

const Home = (): JSX.Element => {

    const inputFile = useRef<HTMLInputElement>(null);

    const [singleUpload] = useMutation(UPLOAD_FILE, {
        onCompleted: data => test(data)
    })

    const handleFileChange = (e: FormEvent<HTMLDivElement>) => {
        e.preventDefault()
        const file = inputFile.current?.files![0]
        if (file) {
            singleUpload({ variables: { file }})
        } else {
            return
        }
    }
    
    const test = (data: any) => {
        console.log(data)
    }

    return(
        <div className={styles.bground} onSubmit={(e) => handleFileChange(e)}>
            <form id="formElem">
            <h1>Choose image</h1>
            <input type="file" name="image" ref={inputFile}/>
            <button type="submit">Create Post</button>
            </form>
        </div>
    )
    
}
export default Home