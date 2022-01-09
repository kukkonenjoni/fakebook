import styles from "./Profile.module.css"
import { useParams } from "react-router-dom"
import { gql, useMutation, useQuery } from "@apollo/client"
import { FormEvent, useEffect, useRef, useState } from "react"
import LoadingAnimation from "../StylingAndAnimations/LoadingAnimation"
import Post from "../Post/Post"
import { useRecoilState } from "recoil"
import userState from "../../atom"

const GET_USER = gql`
    query GetUser($userId: ID) {
    getUser(userId: $userId) {
            email
            age
            firstName
            lastName
            profilePic
            bio
            post {
                likes {
                    id
                }
                id
                author {
                    profilePic
                    id
                    firstName
                    lastName
                }
                createdAt
                content
                imageUrl
                link
            }
            friends {
                firstName
                lastName
            }
        }
    }
`
const UPLOAD_FILE = gql`
    mutation singleUpload($file: Upload!){
        singleUpload(file: $file) {
            url
        }
    }
`
const EDIT_USER = gql`
    mutation EditUser($profilePic: String) {
        editUser(profilePic: $profilePic) {
            profilePic
        }
    }
`


const Profile = () => {

    const { id } = useParams()
    const [ Profile, setProfile ] = useState<any>(null)
    const inputFile = useRef<HTMLInputElement>(null);
    const [ImageName, setImageName] = useState("")
    const [CurrentUser] = useRecoilState(userState)
    const [NewImg, setNewImg] = useState("")
    
    const {data, loading } = useQuery(GET_USER, {variables: {userId: id}})
    const [editUser] = useMutation(EDIT_USER, {
        onCompleted: data => setNewImg(data.editUser.profilePic)
    })
    
    const [singleUpload] = useMutation(UPLOAD_FILE, {
        onCompleted: data => onImageUpdate(data),
    })

    const onImageUpdate = (data: { singleUpload: { url: any } }) => {
        editUser({ variables: {profilePic: data.singleUpload.url}})
        setImageName("")
    }

    // Set query result into better form
    useEffect(() => {
        if (data) setProfile(data.getUser)
    }, [data])

    const handleFileChange = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const file = inputFile.current?.files![0]
        console.log(file)
        if (file !== undefined) {
            singleUpload({ variables: { file }})
        }
    }

    // Loading animation
    if (loading) return  <div className={styles.center}><LoadingAnimation /></div>

    console.log(data)

    // Main content
    if (Profile) {
        return(
            <section className={styles.container}>
                <div className={styles.test}>
                <div className={styles.profile_main}>
                    <div className={styles.image_div}>
                        <img src={NewImg ? NewImg : Profile.profilePic} alt="Profile_picture" className={styles.profile_pic}/>
                        {CurrentUser.id === id ? <form id="formElem" onSubmit={(e) => handleFileChange(e)}>
                            <div className={styles.input_div}>
                                <label htmlFor="image">Choose image</label>
                                <input type="file" name="image" id="image" ref={inputFile} onChange={(e)=> setImageName(e.target.files![0].name)}/>
                                <h1 className={styles.image_h1}>{ImageName ? "Chosen image: " + ImageName: ""}</h1>
                            </div>
                            {ImageName ? <input type="submit" value="Click to confirm change!" className={styles.submit_btn}/> : null}
                        </form> : null}
                    </div>
                    <div className={styles.profile_info}>
                        <h1 className={styles.profile_h1}>{Profile.firstName}</h1>
                        <h1 className={styles.profile_h1}>{Profile.lastName}</h1>
                        <h1 className={styles.profile_h1}>age: {Profile.age}</h1>
                        <h1 className={styles.profile_h1}>contact: {Profile.email}</h1>
                    </div>
                </div>
                </div>
                {Profile.post.map((post: any) => {
                return <Post post={post} key={post.id}/>
            })}
            </section>
        )
    }
    return(
        <h1>No user found</h1>
    )
}

export default Profile