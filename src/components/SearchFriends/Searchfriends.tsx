import { gql, useQuery } from "@apollo/client";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import LoadingAnimation from "../StylingAndAnimations/LoadingAnimation";
import styles from "./Searchfriends.module.css"

const SEARCH_USERS = gql`
    query Search($name: String) {
        search(name: $name) {
            id
            firstName
            lastName
        }
    }
`

const Searchfriends = () => {

    let [searchParams] = useSearchParams();
    let users = searchParams.get("users")
    console.log(users)

    const { data, loading } = useQuery(SEARCH_USERS, {variables: {name: users}})

    useEffect(() => {
        if (data) {
            console.log(data.search)
        }
    },[data])

    if (loading) {
        return <div className={styles.center}> <LoadingAnimation /> </div>
    }
    if (data && data.search.length !== 0) {
        return(
            <div className={styles.users_container}>
                {data.search.map((user: any) => {
                    return (
                        <div className={styles.user} key={user.id}>
                            <h1>{user.firstName}</h1>
                            <h1>{user.lastName}</h1>
                        </div>
                    )
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