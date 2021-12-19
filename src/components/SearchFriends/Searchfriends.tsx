import { gql, useQuery } from "@apollo/client";
import { useSearchParams } from "react-router-dom";
import LoadingAnimation from "../StylingAndAnimations/LoadingAnimation";
import FriendDetail from "./FriendDetail";
import styles from "./Searchfriends.module.css"

const SEARCH_USERS = gql`
    query Search($name: String) {
        search(name: $name) {
            id
            firstName
            lastName
            age
            profilePic
        }
    }
`

const Searchfriends = () => {

    let [searchParams] = useSearchParams();
    let users = searchParams.get("users")

    const { data, loading } = useQuery(SEARCH_USERS, {variables: {name: users}})

    if (loading) {
        return <div className={styles.center}> <LoadingAnimation /> </div>
    }
    if (data && data.search.length !== 0) {
        return(
            <div className={styles.users_container}>
                {data.search.map((user: any) => {
                    return <FriendDetail user={user} key={user.id}/>
                })}
            </div>
        )
    }
    return(
        <div>
            <h1>No Users found with your search :(</h1>
        </div>
    )
}

export default Searchfriends