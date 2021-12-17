import styles from "./Profile.module.css"
import { useParams } from "react-router-dom"
import { gql, useQuery } from "@apollo/client"

const GET_USER = gql`
    query GetUser($userId: ID) {
    getUser(userId: $userId) {
            email
            age
            firstName
            lastName
            profilePic
            post {
                content
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
    console.log(id)
    const {data, loading} = useQuery(GET_USER, {variables: {userId: id}})
    if (data) console.log(data)

    return(
        <div>
            <h1>Profile component</h1>
        </div>
    )
}

export default Profile