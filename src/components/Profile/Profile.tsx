import styles from "./Profile.module.css"
import { useParams } from "react-router-dom"
import { gql, useQuery } from "@apollo/client"
import { useEffect, useState } from "react"
import LoadingAnimation from "../StylingAndAnimations/LoadingAnimation"
import Post from "../Post/Post"

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
                id
                author {
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


const Profile = () => {

    const { id } = useParams()
    const [ Profile, setProfile ] = useState<any>(null)
    const {data, loading } = useQuery(GET_USER, {variables: {userId: id}})

    // Set query result into better form
    useEffect(() => {
        if (data) setProfile(data.getUser)
    }, [data])

    // Loading animation
    if (loading) return  <div className={styles.center}><LoadingAnimation /></div>

    // Main content
    if (Profile) {
        return(
            <section className={styles.container}>
                <div className={styles.test}>
                <div className={styles.profile_main}>
                    <img src={Profile.profilePic} alt="Profile_picture" className={styles.profile_pic}/>
                    <div>
                        <h1 className={styles.profile_h1}>{Profile.firstName}</h1>
                        <h1 className={styles.profile_h1}>{Profile.lastName}</h1>
                        <h1 className={styles.profile_h1}>age: {Profile.age}</h1>
                        <h1 className={styles.profile_h1}>contact: {Profile.email}</h1>
                    </div>
                </div>
                    <h1 className={styles.profile_h1}>Bio: </h1>
                    <h1 className={styles.profile_h1}>{Profile.bio}</h1>
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