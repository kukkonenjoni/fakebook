import { useQuery } from "@apollo/client"
import gql from "graphql-tag"
import styles from "./Chatbar.module.css"

const FRIEND_LIST = gql`
    query Query {
        currentUser {
            friends {
                id
                status
                firstName
                lastName
                }
        }
    }
`

const Chatbar = () => {

    const { data, loading } = useQuery(FRIEND_LIST, {
        pollInterval: 120000
    })
    console.log(data)

    if (loading) {
        return(
            <div className={styles.chatbar}>
                <h1 className={styles.friendName}>Loading</h1>
            </div>
        )
    }
    console.log(data.currentUser.friends)
    return(
        <div className={styles.chatbar}>
            Friend list
            {data.currentUser.friends.map((friend: any) => {
                return(
                    <div className={styles.flist_container}>
                        <div style={{backgroundColor: friend.status ? "green" : "red"}} className={styles.status}></div>
                        <div>
                            <h1 className={styles.friendName}>{friend.firstName}</h1>
                            <h1 className={styles.friendName}>{friend.lastName}</h1>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Chatbar