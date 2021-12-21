import { useLazyQuery, useSubscription } from "@apollo/client"
import gql from "graphql-tag"
import { SetStateAction, useEffect, useState } from "react"
import { useRecoilState } from "recoil"
import userState from "../../atom"
import Chatwindow from "../Chatwindow/Chatwindow"
import styles from "./Chatbar.module.css"

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
    const [CurrentUser] = useRecoilState(userState)

    let subData = useSubscription(ON_MESSAGE)
    console.log(CurrentUser)

    // const fMessages = useQuery(ALL_MESSAGES)
    const [getMessages, {loading, data }] = useLazyQuery(ALL_MESSAGES)
    
    useEffect(() => {
        if (subData.data && AllMessages) {
            const chatroom: Array<any> = AllMessages.map((croom) => {
                if (croom.id === subData.data.message.chatroom.id) {
                    croom.messages.push(subData.data.message)
                }
                return croom
            })
            setAllMessages(chatroom)
        }
    }, [data, subData.data])

    useEffect(() => {
        if (data) {
            const allMessagesQuery = JSON.parse(JSON.stringify(data.getAllMessages))
            setAllMessages(allMessagesQuery)
        }
    }, [data])

    const handleChat = (id: SetStateAction<null>) => {
        setChatFriend(id)
        getMessages()
    }

    console.log(data)

    return(
        <div className={styles.chatbar}>
            Friend list
            {CurrentUser.friends.map((friend: any) => {
                return(
                    <div className={styles.flist_container} key={friend.id} onClick={() => handleChat(friend.id)}>
                        <div style={{backgroundColor: friend.status ? "green" : "red"}} className={styles.status}></div>
                        <div>
                            <h1 className={styles.friendName}>{friend.firstName}</h1>
                            <h1 className={styles.friendName}>{friend.lastName}</h1>
                        </div>
                    </div>
                )
            })}
            {ChatFriend != null && !loading && AllMessages.length > 0 && <Chatwindow messages={AllMessages.filter((chatroom) =>  chatroom.user1.id === ChatFriend || chatroom.user2.id === ChatFriend)}/> }
        </div>
    )
}

export default Chatbar