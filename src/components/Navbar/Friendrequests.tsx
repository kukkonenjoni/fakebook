import { gql, useMutation } from "@apollo/client"
import { useEffect } from "react"
import { useRecoilState } from "recoil"
import userState from "../../atom"
import LoadingAnimation from "../StylingAndAnimations/LoadingAnimation"
import styles from "./Friendrequests.module.css"

const ACCEPT_REQUEST = gql`
    mutation AcceptFriendReq($friendId: ID) {
    acceptFriendReq(friendId: $friendId) {
            id
            firstName
            lastName
            status
        }
    }
`

const Friendrequests = (props: any) => {
    const { request } = props
    const [CurrentUser, setCurrentUser] = useRecoilState(userState)

    const [acceptRequest, { data, loading }] = useMutation(ACCEPT_REQUEST)

    useEffect(() => {
        if (data) {
            const newFriendReq = CurrentUser.received_friendreq.filter((freq: any) => {
                if (freq.id !== data.acceptFriendReq.id) {
                    return freq
                } else {
                    return null
                }
            })
            const newCurrentUser = JSON.parse(JSON.stringify(CurrentUser))
            newCurrentUser.received_friendreq = newFriendReq
            newCurrentUser.friends.push(data.acceptFriendReq)
            console.log("newcurruser: ",newCurrentUser)
            console.log("oldcurruser: ",CurrentUser)
            setCurrentUser(newCurrentUser)
        }
    }, [data])

    if (loading) {
        return (
            <div className={styles.friendbox}>
                <button className={styles.btn}>
                    <span className={styles.spinner}></span>
                    <span className={styles.btn_text}>loading...</span>
                </button>
            </div>
        )
    }

    return(
        <div className={styles.friendbox}>
            <img src={request.profilePic} alt="Avatar" className={styles.profilepic}/>
            <h1>{request.firstName + " " + request.lastName}</h1>
            <button className={styles.accept_btn} onClick={() => acceptRequest({variables: {friendId: request.id}})}>&#9989;</button>
            <button className={styles.reject_btn}>&#10060;</button>
        </div>
    )
}

export default Friendrequests