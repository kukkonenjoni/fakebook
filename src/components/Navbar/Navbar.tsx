import styles from "./Navbar.module.css"
import logo from "../StylingAndAnimations/download.svg"
import { FormEvent, useEffect, useState } from "react"
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import userState from "../../atom";
import Friendrequests from "./Friendrequests";


const Navbar = () => {

    const [CurrentUser] = useRecoilState(userState)
    let [searchParams, setSearchParams] = useSearchParams();
    let users = searchParams.get("users");
    let navigate = useNavigate()
    const [FriendReqStatus, setFriendReqStatus] = useState(false)

    const onSearch = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        let formData = new FormData(e.currentTarget);
        let newUser = formData.get("users") as string;
        if (!newUser) return;
        setSearchParams({ users: newUser });
    }

    useEffect(() => {
        if (!users) return
        if (users) {
            navigate(`../search/?users=${users}`, {replace: true})
        }
    }, [users, navigate])

    return(
        <nav className={styles.navbar}>
            <Link to={"/"}>
                <img className={styles.logo} src={logo} alt="Fakebook logo"/>
            </Link>
            <form className={styles.searchform} onSubmit={(e) => onSearch(e)}>
                <input className={styles.search} type="search" name="users"></input>
                <button type="submit" className={styles.searchbtn}>Search</button>
            </form>
            <div className={styles.navicons}>
                <h1 className={styles.navtext} onClick={() => setFriendReqStatus(!FriendReqStatus)}>Friend Requests ({CurrentUser.received_friendreq.length})</h1>
                <h1 className={styles.navtext}>Profile</h1>
                <h1 className={styles.navtext}>Log Out</h1>
            </div>
            {FriendReqStatus ? 
            <div className={styles.friend_requests} onClick={() => setFriendReqStatus(!FriendReqStatus)}>
                <div className={styles.friend_requests_container} onClick={(e) => e.stopPropagation()}>
                    {CurrentUser.received_friendreq.map((fReq: any) => {
                        return <Friendrequests request={fReq}/>
                    })}
                </div>
            </div>
            :
            null
        } 
        </nav>
    )
}

export default Navbar