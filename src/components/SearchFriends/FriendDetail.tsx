import { gql, useMutation } from "@apollo/client"
import { useRecoilState } from "recoil"
import userState from "../../atom"
import styles from "./FriendDetail.module.css"

const FRIEND_REQUEST = gql`
    mutation SendFriendReq($friendId: ID) {
        sendFriendReq(friendId: $friendId) {
            id
        }
    }
`

const FriendDetail = (props: any) => {

    const [CurrentUser] = useRecoilState(userState)
    const [sendFriendRequest, { data, loading, error}] = useMutation(FRIEND_REQUEST)
    const { user } = props
    const requestSent = CurrentUser.sent_friendreq.filter((curr_user: any) => {
        if (curr_user.id === user.id) {
            return curr_user
        } else {
            return null
        }
    })
    console.log(requestSent)

    const friendRequest = () => {
        sendFriendRequest({ variables: {friendId: user.id}})
    }
    if (CurrentUser.id === user.id) {
        return null
    }
    return(
        <div className={styles.user}>
            <img src={user.profilePic} alt="Profile" className={styles.profile_pic} />
            <div>
                <h1>First name: {user.firstName}</h1>
                <h1>Last name: {user.lastName}</h1>
                <h1>Age: {user.age}</h1>
            </div>
            {loading || data || requestSent.length > 0 ? 
            <button className={styles.btn_cancel}>Cancel friend request</button>
            :
            <button onClick={() => friendRequest()} className={styles.btn_add}>Send friend request</button>}
        </div>
    )
}

export default FriendDetail