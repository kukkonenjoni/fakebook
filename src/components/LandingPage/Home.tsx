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
        }
    }
`

const Home = (): JSX.Element => {

    const [Content, setContent] = useState("")
    const [ImageName, setImageName] = useState("")
    const inputFile = useRef<HTMLInputElement>(null);

    const [singleUpload] = useMutation(UPLOAD_FILE, {
        onCompleted: data => test(data)
    })

    const handleFileChange = (e: FormEvent<HTMLDivElement>) => {
        e.preventDefault()
        const file = inputFile.current?.files![0]
        if (file) {
            singleUpload({ variables: { file }})
        } else if(!file && Content) {
            return
        } else {
            console.log("working")
            return
        }
    }
    
    const test = (data: any) => {
        console.log(data)
    }
    console.log(inputFile.current?.files![0])

    return(
        <div className={styles.bground} onSubmit={(e) => handleFileChange(e)}>
            <form id="formElem" className={styles.form}>
                <h1>Create a post for your friends to see!</h1>
                <textarea className={styles.textinput} onChange={(e) => setContent(e.target.value)}/>
                <div className={styles.input_div}>
                    <label htmlFor="image" className="file">Choose image</label>
                    <input type="file" name="image" id="image" ref={inputFile} onChange={(e)=> setImageName(e.target.files![0].name)}/>
                    <h1>{ImageName ? "Current image: " + ImageName: ""}</h1>
                </div>
                <input type="submit" className={styles.submitbtn} value="Submit post!" />
            </form>
        </div>
    )
    
}
export default Home