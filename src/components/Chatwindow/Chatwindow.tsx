import styles from "./Chatwindow.module.css"
import { useRecoilState } from "recoil";
import userState from "../../atom"
import { gql, useMutation } from "@apollo/client";
import { FormEvent, useState } from "react";

const SEND_MESSAGE = gql`
    mutation Message($receiver: ID, $content: String) {
        message(receiver: $receiver, content: $content) {
            createdBy {
            id
            }
            receivedBy {
            id
            }
        }
    }
`


const Chatwindow = (props: any) => {
    console.log(props)
    const [CurrentUser] = useRecoilState<any>(userState)
    console.log("CurrUser: ", CurrentUser)

    const [InputText, setInputText] = useState("")
    const [Message] = useMutation(SEND_MESSAGE);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(InputText)
        try {
            if (props.messages[0].user1.id !== CurrentUser.id) {
                await Message({variables: {receiver: props.messages[0].user1.id , content: InputText}})
            } else {
                await Message({variables: {receiver: props.messages[0].user2.id , content: InputText}})
            }
            setInputText("")
        } catch (err) {
            console.error(err)
            return "Please fill both fields!"
        }
    }

    return(
        <section className={styles.chat_section}>
            <div className={styles.user_name} >
                <h1>{props.messages[0].user1.id !== CurrentUser.id ? props.messages[0].user1.firstName +" "+ props.messages[0].user1.lastName : props.messages[0].user2.firstName +" "+ props.messages[0].user2.lastName }</h1>
            </div>
            <div className={styles.reverse}>
                <div className={styles.container}>
                    {props.messages[0].messages.map((msg: { createdBy: { id: null; }; messagecontent: {} | null | undefined; }) => {
                        if (msg.createdBy.id === CurrentUser.id) {
                            return(
                                <p className={styles.msg_self}>{msg.messagecontent}</p>
                            )
                        }
                        return(
                            <p className={styles.msg_friend}>{msg.messagecontent}</p>
                        )
                    })}
                </div>
            </div>
            <form className={styles.new_message} onSubmit={(e) => handleSubmit(e)}>
                    <input type="text" placeholder="Message..." className={styles.form_text} onChange={(e) => setInputText(e.target.value)} value={InputText}></input>
                    <button type="submit" className={styles.form_btn}>Send</button>
            </form>
        </section>
    )
}

export default Chatwindow