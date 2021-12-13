import { useQuery, useSubscription } from "@apollo/client"
import gql from "graphql-tag"
import { useEffect, useState } from "react"
import Chatwindow from "../Chatwindow/Chatwindow"
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
const ALL_MESSAGES = gql`
    query GetAllMessages {
    getAllMessages {
      id
      messages {
        id
        receivedBy {
            id
        }
        createdBy {
            id
        }
        messagecontent
      }
      user1 {
        firstName
        lastName
        id
      }
      user2 {
        firstName
        lastName
        id
      }
    }
  }
`
const ON_MESSAGE = gql`
    subscription Message {
        message {
            id
            createdBy {
                id
            }
            chatroom {
                id
            }
            messagecontent
        }
    }
`

const Chatbar = () => {

    const [AllMessages, setAllMessages] = useState<Array<any>>(Array)
    const [ChatFriend, setChatFriend] = useState(null)

    let {data} = useSubscription(ON_MESSAGE)


    const fList = useQuery(FRIEND_LIST, {
        pollInterval: 120000
    })
    const fMessages = useQuery(ALL_MESSAGES)
    useEffect(() => {
        if (data && AllMessages) {
            const chatroom: Array<any> = AllMessages.map((croom) => {
                if (croom.id === data.message.chatroom.id) {
                    croom.messages.push(data.message)
                }
                return croom
            })
            setAllMessages(chatroom)
        }
    }, [fMessages.data, data])
    useEffect(() => {
        if (fMessages.data) {
            const allMessagesQuery: any = JSON.parse(JSON.stringify(fMessages.data.getAllMessages))
            setAllMessages(allMessagesQuery)
        }
    }, [fMessages.data])

    if (fList.loading) {
        return(
            <div className={styles.chatbar}>
                <h1 className={styles.friendName}>Loading</h1>
            </div>
        )
    }
    return(
        <div className={styles.chatbar}>
            {/*console.log(AllMessages)*/}
            Friend list
            {fList.data.currentUser.friends.map((friend: any) => {
                return(
                    <div className={styles.flist_container} key={friend.id} onClick={() => setChatFriend(friend.id)}>
                        <div style={{backgroundColor: friend.status ? "green" : "red"}} className={styles.status}></div>
                        <div>
                            <h1 className={styles.friendName}>{friend.firstName}</h1>
                            <h1 className={styles.friendName}>{friend.lastName}</h1>
                        </div>
                    </div>
                )
            })}
            {ChatFriend != null && <Chatwindow messages={AllMessages.filter((chatroom) =>  chatroom.user1.id === ChatFriend || chatroom.user2.id === ChatFriend)}/> }
        </div>
    )
}

export default Chatbar