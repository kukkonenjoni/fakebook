import styles from "./Chatwindow.module.css"

const Chatwindow = (props: any) => {
    const messages = props.messages[0]
    console.log(messages)
    return(
        <div>
            <h2>Chatwindow</h2>
        </div>
    )
}

export default Chatwindow